function JournalForm({ handleSubmit, register }) {
  return (
    <div className="sticky bottom-0">
      <form className="journal-entry-form" onSubmit={handleSubmit}>
        <input type="text" name="message" autoComplete="off" {...register("message")} />
        <button className="btn hidden sm:block" type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default JournalForm
