import { useState } from "react"
import { Button, Flex, TextInput } from "@mantine/core"
import { modals } from "@mantine/modals"
import axios from "axios"
import { to } from "../util/helpers"

const AssigneeModal = (props) => {
  const { selectedQuestions, setSelectedQuestions, fetchQuestions, id } = props
  const [assignee, setAssignee] = useState("")

  const assigneeChange = async (e) => {
    e.preventDefault()
    const promises = []
    if (selectedQuestions.length >= 1) {
      selectedQuestions.forEach((question) => {
        promises.push(axios.put(`/api/questions/${question}`, { assignedTo: assignee, updatedBy: localStorage.getItem("user") }))
      })
    } else {
      promises.push(axios.put(`/api/questions/${id}`, { assignedTo: assignee, updatedBy: localStorage.getItem("user") }))
    }
    const [response, error] = await to(Promise.all(promises))
    if (error) {
      console.error(error)
      return
    }
    setSelectedQuestions([])
    modals.closeAll()
    setAssignee("")
    await fetchQuestions()
  }

  return (
    <form onSubmit={assigneeChange}>
      <Flex direction="column" gap="xs">
        {selectedQuestions.length >= 1 && <>You are about to edit all selected questions</>}
        <TextInput required type="email" placeholder="Assignee" label="Assignee" value={assignee} onChange={(event) => setAssignee(event.currentTarget.value)} />
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  )
}

export default AssigneeModal
