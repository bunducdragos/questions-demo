import prisma from "../utils/db.js"
import { to } from "../utils/helpers.js"

export const getAll = async (req, res) => {
  const [response, error] = await to(prisma.question.findMany({}))
  if (error) return res.status(500).json({ message: error.message })

  res.status(200).json(response)
}

export const getById = async (req, res) => {
  const { id } = req.params
  const [response, error] = await to(prisma.question.findUnique({ where: { id: parseInt(id) } }))
  if (error) return res.status(500).json({ message: error.message })

  res.status(200).json(response)
}

export const create = async (req, res) => {
  console.log(req.body)
  const [response, error] = await to(prisma.question.create({ data: req.body }))
  if (error) return res.status(500).json({ message: error.message })

  res.status(200).json(response)
}

export const update = async (req, res) => {
  const { id } = req.params
  const [response, error] = await to(prisma.question.update({ where: { id: parseInt(id) }, data: req.body }))
  if (error) return res.status(500).json({ message: error.message })

  res.status(200).json(response)
}

export const remove = async (req, res) => {
  const { id } = req.params
  const [response, error] = await to(prisma.question.delete({ where: { id: parseInt(id) } }))
  if (error) return res.status(500).json({ message: error.message })

  res.status(201).end()
}
