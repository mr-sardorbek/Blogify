import { useSelector } from "react-redux";
import { Input, TextArea } from ".";

const ArticleForm = ({
  title,
  setTitle,
  description,
  setDescription,
  body,
  setBody,
  formSubmit
}) => {

  const {isLoading} = useSelector(state => state.article)


  return (
    <form >
      <Input label="Title" state={title} setState={setTitle} />

      <TextArea
        label="Description"
        state={description}
        setState={setDescription}
      />

      <TextArea
        label="Body"
        state={body}
        setState={setBody}
        height="300px"
      />

      <button
        className="btn btn-primary mt-2 w-100 py-2"
        type="submit" disabled={isLoading} onClick={formSubmit}
      >
        {isLoading ? "Loading..." : "Create"}
      </button>
    </form>
  );
};

export default ArticleForm;
