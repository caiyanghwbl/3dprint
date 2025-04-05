// backend/controllers/pdfController.js
const Application = require('../models/Application')
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

exports.generatePDF = async (req, res) => {
  try {
    const { applicationId } = req.body
    const application = await Application.findById(applicationId)
    if (!application) return res.status(404).json({ message: 'Application not found' })

    const doc = new PDFDocument()
    doc.registerFont('Chinese', path.join(__dirname, '../fonts/simsun.ttf'))
    doc.font('Chinese')

    const pdfDir = 'pdfs'
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir)
    }
    const pdfPath = path.join(pdfDir, `${applicationId}.pdf`)
    const writeStream = fs.createWriteStream(pdfPath)
    doc.pipe(writeStream)

    const currentDate = new Date()
    const formattedDate = currentDate.getFullYear() + '-' +
      (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
      currentDate.getDate().toString().padStart(2, '0')

    doc.fontSize(20).text('南京艺术学院3D打印设备使用申请责任书', { align: 'center' })
    doc.moveDown(1.5)

    const content = `
本人：${application.applicantName}，学号/工号：${application.applicantId}，
联系电话：${application.phone}，
专业：${application.major}，
课程名称：${application.courseName}，
任课老师：${application.teacherName}，
申请设备：${application.device}，
申请原因：${application.reason}。

因学习/科研需要，现申请使用学校3D打印实验室的设备进行相关操作。为确保设备的安全运行和合理使用，
本人郑重承诺：

严格遵守南京艺术学院3D打印实验室的各项管理规定，服从实验室管理人员的指导和安排。在使用设备前，接受必要的培训，熟悉设备的操作流程和安全事项，确保按照规范进行操作。按照实验室要求使用指定的打印材料，不擅自更换或使用未经许可的材料。合理安排使用时间，珍惜公共资源，按时完成操作，不影响他人使用。

本人已详细阅读并理解以上条款，自愿签署本责任书，并承诺严格遵守。
`
    doc.fontSize(12).text(content, { align: 'left', lineGap: 6 })
    doc.moveDown()

    const usageDT = new Date(application.usageDateTime).toLocaleString('zh-CN')
    doc.text(`申请使用日期和时间： ${usageDT}`)
    doc.moveDown()

    doc.text(`当前状态： ${application.approvalStatus}`, { underline: true })
    doc.moveDown()

    if (application.signature) {
      doc.text('申请人签名：', { continued: true })
      const signatureBase64 = application.signature.replace(/^data:image\/\w+;base64,/, '')
      const signatureBuffer = Buffer.from(signatureBase64, 'base64')
      doc.image(signatureBuffer, { fit: [150, 50], align: 'left' })
    } else {
      doc.text('申请人签名：__________')
    }
    doc.moveDown()
    doc.text(`日期： ${formattedDate}`)

    doc.end()

    writeStream.on('finish', async () => {
      application.pdfUrl = pdfPath
      await application.save()
      res.json({ success: true, pdfUrl: pdfPath })
    })

    writeStream.on('error', (err) => {
      console.error('PDF写入错误：', err)
      res.status(500).json({ success: false, message: err.message })
    })
  } catch (error) {
    console.error('PDF生成错误：', error)
    res.status(500).json({ success: false, message: error.message })
  }
}
