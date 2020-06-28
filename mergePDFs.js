const pdf = require('pdfjs')
const fs = require('fs')

class PDFMerger {
  constructor() {
    this.doc = new pdf.Document()
  }

  addAllFromFolder(folder) {
    fs.readdirSync(folder).forEach((file) => {
      this._addEntireDocument(`${folder}${file}`)
    })
  }

  _addEntireDocument(inputFile) {
    var src =
      inputFile instanceof Buffer ? inputFile : fs.readFileSync(inputFile)
    var ext = new pdf.ExternalDocument(src)
    this.doc.addPagesOf(ext)
  }

  async save(fileName) {
    try {
      var writeStream = this.doc.pipe(fs.createWriteStream(fileName))
      await this.doc.end()

      var writeStreamClosedPromise = new Promise((resolve, reject) => {
        try {
          writeStream.on('close', () => resolve())
        } catch (e) {
          reject(e)
        }
      })

      return writeStreamClosedPromise
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = PDFMerger
