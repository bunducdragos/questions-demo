import { modals } from "@mantine/modals"
import { Button, TextInput, Loader, Flex, TagsInput } from "@mantine/core"
import { useEffect, useState } from "react"
import axios from "axios"
import { to } from "../util/helpers"
import { useForm } from "@mantine/form"

const QuestionModal = (props) => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    mode: "controlled",
    initialValues: props.question || { question: "", answer: "", properties: [], assignedTo: "" },
  })

  useEffect(() => {
    if (props.question) {
      ;(async () => {
        setLoading(true)
        const [response, error] = await to(axios.get(`/api/questions/${props.question.id}`))
        if (error) {
          console.error(error)
          return
        }
        form.setValues(response.data)
        setLoading(false)
      })()
    }
  }, [])

  if (loading) {
    return (
      <Flex justify="center">
        <Loader color="blue" />
      </Flex>
    )
  }

  const handleCreate = async () => {
    console.log(form.values)
    const [response, error] = await to(axios.post("/api/questions", { ...form.values, createdBy: "admin@email.com" }))
    if (error) {
      console.error(error)
      return
    }
    console.log(response)
    modals.closeAll()
    props.refreshData()
  }

  const handleUpdate = async () => {
    const [response, error] = await to(axios.put(`/api/questions/${props.question.id}`, form.values))
    if (error) {
      console.error(error)
      return
    }
    modals.closeAll()
    props.refreshData()
  }

  return (
    <Flex gap="xs" direction="column">
      <TextInput required label="Question" placeholder="Question" key={form.key("question")} {...form.getInputProps("question")} />
      <TextInput label="Answer" placeholder="Answer" key={form.key("answer")} {...form.getInputProps("answer")} />
      <TagsInput label="Press Enter to save a propertie" placeholder="Enter propertie" key={form.key("properties")} {...form.getInputProps("properties")} />
      <TextInput label="Assigned To" placeholder="Assigned To" key={form.key("assignedTo")} {...form.getInputProps("assignedTo")} />

      {props.question ? (
        <Button fullWidth onClick={handleUpdate} mt="md">
          Update
        </Button>
      ) : (
        <Button fullWidth onClick={handleCreate} mt="md">
          Create
        </Button>
      )}
    </Flex>
  )
}

export default QuestionModal
