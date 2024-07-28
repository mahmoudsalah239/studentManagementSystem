export const ApiRoutes = {
    account: {
        login: " /User/Login",
        register: "/User/POST",
        registerClient: "/Account/RegisterClient",
        getAllSubAgents: "/Account/getAllSubAgents?userid=",
        deleteUser: "/Account/deleteUser/",
        logout: "/User/Logout"
      },
    Student: {
        getAllStudent: "/Student/Get",
        addStudent: "/Student/Post",
        editStudent: "/Student/Edit",
        getStudentById: "/Student/GetByID",
        deleteStudent: "/Student/Delete",
      },

    }