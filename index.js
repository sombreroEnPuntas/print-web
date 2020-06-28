const { getPage } = require('./generatePDF')
const PDFMerger = require('./mergePDFs')
const { getAll, index, root } = require('./pages')

/**
 * Generate a PDF manual for OP-1 from teenage engineering
 * Could be used for any other web site actually :D
 */
;(async () => {
  let order = 0

  await getPage(root + index, '000')

  const all = await getAll()

  for (const page of all) {
    order++

    await getPage(root + page, `000${order}`.slice(-3))
  }

  const merger = new PDFMerger()

  merger.addAllFromFolder('./output/')

  await merger.save('./output/op-1_v2-2.pdf')

  process.exit(0)
})()
