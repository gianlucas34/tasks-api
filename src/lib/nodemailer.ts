import 'dotenv/config'
import nodemailerLib from 'nodemailer'
import { Task } from '../models/Task'

interface SendEmailProps {
  email: string
  task: Pick<Task, 'title' | 'description'>
}

const sendEmail = async ({ email, task }: SendEmailProps) => {
  const transporter = nodemailerLib.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  return await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'Nova tarefa criada',
    html: `
      <h1>Temos uma nova tarefa para você!</h1>
      <h3>${task.title}</h3>
      <h4>${task.description}</h3>
    `,
  })
}

export const nodemailer = { sendEmail }
