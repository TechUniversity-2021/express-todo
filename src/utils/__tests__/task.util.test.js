const fileOps = require('../task.util')
const fs = require('fs')

describe('Convert todo function: ', () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
  
    };
    const mockRequest = null;
  
    it('should return an array of object',async () => {
       const data= fileOps.convertTodo("a|b|c\nd|e|f");
        expect(data).toEqual([{id:"a", todo:"b", status:"c"},{id:"d", todo:"e", status:"f"}])
    });
    
  });

  describe('Read data function : ', () => {
  
  
    it('should read contents of file',async (done) => {
      jest.spyOn(fs, 'readFile')
      .mockImplementation((file, option, cb)=> cb(null, 'abc'));
      fileOps.readData('./anyfile').then(data => {
          expect('abc').toBe(data);
          done();
    });
    
  })
})

describe('Write data function : ', () => {
  
  
  it('should append contents to file',async () => {
    const appendSpy=jest.spyOn(fs, 'appendFile');
    fileOps.writeData("./abc", "abc");
    expect(appendSpy).toHaveBeenCalled();

    
  });
  
})

describe('Convert todo by user: ', () => {
  
  
  it('should return data given by user in file format',() => {
   const fileContent = fileOps.convertTodoByUser({todo:"b", status:"c"}, 1);
   expect(fileContent).toEqual('1|b|c\n')
        
  });
  
})

describe('ChangeData function should',() => {
  xit('Should change data in file:',async ()=>{
    const oldContent="abc";
    const newContent="def";
    const readSpy=jest.spyOn(fileOps,'readData').mockResolvedValue('a|b|c\nd|e|f')

    await fileOps.changeData([{id:"a"}], {id:"b"},2);

    expect(readSpy).toHaveBeenCalled()
    

  })
})

