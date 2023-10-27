export const loop=(list)=>{
    return  list.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))
}