import { getEmployees, saveEmployees} from "./storage";

export const initEmployees = () => {
    const existing = getEmployees();

    if (existing.length === 0) {
         const dummyEmployees = [
      {
        id: "EMP001",
        name: "Amit Sharma",
        gender: "Male",
        dob: "1994-05-12",
        state: "Maharashtra",
        image: "",
        isActive: true,
      },
      {
        id: "EMP002",
        name: "Priya Verma",
        gender: "Female",
        dob: "1996-09-20",
        state: "Karnataka",
        image: "",
        isActive: false,
      },
    ];
      saveEmployees(dummyEmployees);
    }
}