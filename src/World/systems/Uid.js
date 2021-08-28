let last_id = -1

const Uid = {
    next: () => { return (last_id = last_id + 1).toString(36)}
}
  
Object.freeze(Uid)
export default Uid