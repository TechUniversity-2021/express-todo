const fileUtils= require('../../utils/task.util');
const fileOps = require('../task.service');
const fileRepo = require('../../repository/todo.repository')

// describe('Get todos service:',() =>{
//     it("should display todos ", async ()=>{
//         const readSpy=jest.spyOn(fileUtils, 'readData')
//         .mockResolvedValue('a|b|c\nd|e|f');

//         const convertSpy=jest.spyOn(fileUtils, 'convertTodo')
//         .mockResolvedValue([{id:"a", todo:"b", status:"c"},{id:"d", todo:"e", status:"f"}])

//   const data=await fileOps.getTodosService();
//       expect(readSpy).toHaveBeenCalled()
//       expect(convertSpy).toHaveBeenCalledWith('a|b|c\nd|e|f');
//       expect(data).toEqual([{id:"a", todo:"b", status:"c"},{id:"d", todo:"e", status:"f"}])
            
//      } )

    // it("should display all todos", async()=>{
    //     const testData= 'a|b|c\nd|e|f';
    //     const result= [{id:"a", todo:"b", status:"c"},{id:"d", todo:"e", status:"f"}]
    //     const readSpy=jest.spyOn(fileUtils, 'readData').mockResolvedValue(testData);
    //     const todoList= await fileOps.getTodosService();
    //     // expect(readSpy).toHaveBeenCalled();
    //     expect(todoList).toBe(result)
    // })
    // })

describe('Get todos service:',() =>{
    it("should display todo by id ", async ()=>{

        const todos =  [{
            title: 'abc',
        }]
        
        const spyOnTodoRepo = jest.spyOn(fileRepo,'getTodoById').mockResolvedValue(todos);

        const todoList = await fileRepo.getTodoById('db', 1);
        expect(todoList).toEqual(todos);
        expect(spyOnTodoRepo).toHaveBeenCalledWith('db',1);

     } )
    })
