import prisma from "../utils/db.js"

export const getAll = async (req, res) => {
  const questions = await prisma.question.findMany({})
  console.log(questions)
  res.status(400).json({ message: "Not Implemented" })
}

export const getById = async (req, res) => {
  res.status(400).json({ message: "Not Implemented" })
}

export const create = async (req, res) => {
  res.status(400).json({ message: "Not Implemented" })
}

export const update = async (req, res) => {
  res.status(400).json({ message: "Not Implemented" })
}

export const remove = async (req, res) => {
  res.status(400).json({ message: "Not Implemented" })
}
