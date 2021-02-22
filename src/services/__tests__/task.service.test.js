const fileUtils= require('../../utils/task.util');
const fileOps = require('../task.service');

describe('Get todos service:',() =>{
    it("should display todos ", async ()=>{
        const readSpy=jest.spyOn(fileUtils, 'readData')
        .mockResolvedValue('a|b|c\nd|e|f');

        const convertSpy=jest.spyOn(fileUtils, 'convertTodo')
        .mockResolvedValue([{id:"a", todo:"b", status:"c"},{id:"d", todo:"e", status:"f"}])

  const data=await fileOps.getTodosService();
      expect(readSpy).toHaveBeenCalled()
      expect(convertSpy).toHaveBeenCalledWith('a|b|c\nd|e|f');
      expect(data).toEqual([{id:"a", todo:"b", status:"c"},{id:"d", todo:"e", status:"f"}])
            
     } )

    // it("should display all todos", async()=>{
    //     const testData= 'a|b|c\nd|e|f';
    //     const result= [{id:"a", todo:"b", status:"c"},{id:"d", todo:"e", status:"f"}]
    //     const readSpy=jest.spyOn(fileUtils, 'readData').mockResolvedValue(testData);
    //     const todoList= await fileOps.getTodosService();
    //     // expect(readSpy).toHaveBeenCalled();
    //     expect(todoList).toBe(result)
    // })
    })
