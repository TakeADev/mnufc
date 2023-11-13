const FormInput = ({ value, name, onChange, label }) => {
  return (
    <div className='mt-5 mx-auto text-center'>
      <label className='absolute text-gray-400 ml-2'>{label}</label>
      <input
        type='text'
        className='w-11/12 h-14 bg-slate-900 border border-slate-700 rounded-md focus:border-cyan-300 focus:outline-none focus:ring-0 pl-2 pt-5'
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput
