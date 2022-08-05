import {getAllAcademicians, getAllGraduates, getAllStudents} from "../../api/apiCalls";
import exportFromJSON from "export-from-json";

export async function getAllUsers(token) {
    let user1 = [];
    let user2 = [];
    let user3 = [];

    await getAllStudents(token).then(response => {
        const userCopy = [...response.data];
        userCopy.forEach((element) => {
            element.role = "ROLE_STUDENT";
        })
        user1 = [...userCopy];
    }).catch(error => {
        console.log(error);
    })

    await getAllAcademicians(token).then(response => {
        const userCopy = [...response.data];
        userCopy.forEach((element, key = element.id) => {
            element.role = "ROLE_ACADEMICIAN";
        })
        user2 = user1.concat(userCopy);

    }).catch(error => {
        console.log(error);
    })

    await getAllGraduates(token).then(response => {
        const userCopy = [...response.data];
        userCopy.forEach((element) => {
            element.role = "ROLE_GRADUATE";
        })
        user3 = user2.concat(userCopy);
    }).catch(error => {
        console.log(error);
    })

    const data = [{ sample: 'sample'}, { sample1: 'sample1' }]
    const fileName = 'download'
    const exportType = 'excel'

    exportFromJSON({ data, fileName, exportType })
    console.log(user3);

    return user3;

}