import { Table, Flex, Button, TextInput, Checkbox, Loader, ActionIcon, Chip, Pill } from "@mantine/core"
import { useEffect, useState } from "react"
import axios from "axios"
import { to } from "../util/helpers"
import { LuTrash2, LuPenLine, LuChevronDown } from "react-icons/lu"
import { modals } from "@mantine/modals"
import QuestionModal from "../components/QuestionModal"
import AssigneeModal from "../components/AssigneeModal"

const Homepage = () => {
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [search, setSearch] = useState("")
  const [assignee, setAssignee] = useState("")

  useEffect(() => {
    ;(async () => {
      await fetchQuestions()
    })()
  }, [search])

  const fetchQuestions = async () => {
    setLoading(true)
    const [response, error] = await to(axios.get("/api/questions?search=" + search))
    if (error) {
      console.error(error)
      return
    }
    setQuestions(response.data)
    setLoading(false)
  }

  const handleSelection = (state, id) => {
    if (state === true) {
      setSelectedQuestions([...selectedQuestions, id])
    } else {
      setSelectedQuestions(selectedQuestions.filter((question) => question !== id))
    }
  }

  const handleSelectAll = (state) => {
    if (state === true) {
      setSelectedQuestions(questions.map((question) => question.id))
    } else {
      setSelectedQuestions([])
    }
  }

  const handleQuestionDelete = async (id) => {
    const [response, error] = await to(axios.delete(`/api/questions/${id}`))
    if (error) {
      console.error(error)
      return
    }

    await fetchQuestions()
  }

  const handleAddQeustion = async () => {
    modals.open({
      title: "Add Question",
      children: <QuestionModal refreshData={fetchQuestions} />,
    })
  }

  const handleAssigneeChange = async (id) => {
    modals.open({
      title: "Assign Question",
      children: <AssigneeModal selectedQuestions={selectedQuestions} setSelectedQuestions={setSelectedQuestions} fetchQuestions={fetchQuestions} id={id} />,
    })
  }

  const handleQuestionEdit = async (question) => {
    modals.open({
      title: "Edit Question",
      children: <QuestionModal refreshData={fetchQuestions} question={question} />,
    })
  }

  return (
    <Flex gap="md" direction="column">
      <Flex justify="space-between">
        <TextInput placeholder="Search" value={search} onChange={(event) => setSearch(event.currentTarget.value)} />
        <Button onClick={handleAddQeustion}>Add Question</Button>
      </Flex>
      {loading ? (
        <Flex justify="center">
          <Loader color="blue" />
        </Flex>
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox onChange={(event) => handleSelectAll(event.currentTarget.checked)} />
              </Table.Th>
              <Table.Th>Question</Table.Th>
              <Table.Th>Answer</Table.Th>
              <Table.Th>Properties</Table.Th>
              <Table.Th>Assigned To</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {questions.map((question) => (
              <Table.Tr key={question.id}>
                <Table.Td>
                  <Checkbox checked={selectedQuestions.includes(question.id)} onChange={(event) => handleSelection(event.currentTarget.checked, question.id)} />
                </Table.Td>
                <Table.Td>{question.question}</Table.Td>
                <Table.Td>{question.answer}</Table.Td>
                <Table.Td>
                  <Flex gap="xs" wrap="wrap">
                    {question.properties.map((item) => (
                      <Pill style={{ backgroundColor: "#3b3b3b" }} color="gray" key={item + question.id}>
                        {item}
                      </Pill>
                    ))}
                  </Flex>
                </Table.Td>
                <Table.Td>
                  {question.assignedTo && (
                    <Chip checked={false} onClick={() => handleAssigneeChange(question.id)}>
                      <Flex justify="center" align="center" gap="xs">
                        {question.assignedTo} <LuChevronDown />
                      </Flex>
                    </Chip>
                  )}
                </Table.Td>
                <Table.Td>
                  <Flex gap="xs">
                    <ActionIcon onClick={() => handleQuestionEdit(question)} color="green" size="md">
                      <LuPenLine />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleQuestionDelete(question.id)} color="red" size="md">
                      <LuTrash2 />
                    </ActionIcon>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Flex>
  )
}

export default Homepage
