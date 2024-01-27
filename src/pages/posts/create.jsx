import { React } from "react"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { object } from "yup"
import { Formik } from "formik"
import axios from "axios"
import FormFieldPost from "@/web/components/ui/FormFieldPost"
import { postsTitleValidator, postsContentValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"


const CreatePostPage = () => {
 const { session } = useSession()
   const userId = session ? session.id : null
  const initialValues = {
    title: "",
    content: "",
    authorId: userId,
  }
  const validationSchema = object({
    title: postsTitleValidator.label("Title"),
    content: postsContentValidator.label("Content"),
  })
  const handleSubmit = async (values, { resetForm }) => {
    values.authorId = userId
    await axios.post("http://localhost:3000/api/posts", values)
    resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" placeholder="Enter a title" />
        <FormFieldPost
          name="content"
          placeholder="Type the content of your article here!"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        >
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export default CreatePostPage
