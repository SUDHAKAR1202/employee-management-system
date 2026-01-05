import { useState, useEffect } from "react";
import { getEmployees, saveEmployees } from "../../utils/storage";

const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Telangana"];

const EmployeeForm = ({ onClose, selectedEmployee, refreshEmployees }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    image: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) {
      setForm(selectedEmployee);
    }
  }, [selectedEmployee]);

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const employees = getEmployees();

    if (selectedEmployee) {
      const updated = employees.map((emp) =>
        emp.id === selectedEmployee.id ? form : emp
      );
      saveEmployees(updated);
    } else {
      const newEmployee = {
        ...form,
        id: `EMP${Date.now()}`,
      };
      saveEmployees([...employees, newEmployee]);
    }

    refreshEmployees();
    onClose();
  };
    return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>{selectedEmployee ? "Edit Employee" : "Add Employee"}</h3>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        {errors.gender && <p style={styles.error}>{errors.gender}</p>}

        <input
          type="date"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />
        {errors.dob && <p style={styles.error}>{errors.dob}</p>}

        <select
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {errors.state && <p style={styles.error}>{errors.state}</p>}

        <input type="file" accept="image/*" onChange={handleImage} />

        {form.image && (
          <img src={form.image} alt="preview" width="80" />
        )}

        <label>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={() =>
              setForm({ ...form, isActive: !form.isActive })
            }
          />
          Active
        </label>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1300,
  },

  form: {
    background: "#ffffff",
    padding: "24px",
    width: "760px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontFamily: "Inter, sans-serif",
  },

  title: {
    marginBottom: "8px",
    textAlign: "center",
    fontWeight: 600,
  },

  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  select: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },

  imagePreview: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },

  saveBtn: {
    flex: 1,
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
  },

  cancelBtn: {
    flex: 1,
    padding: "10px",
    background: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  error: {
    color: "#d32f2f",
    fontSize: "12px",
    marginTop: "-6px",
  },
};


export default EmployeeForm;
