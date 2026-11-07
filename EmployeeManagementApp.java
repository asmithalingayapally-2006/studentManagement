
public class EmployeeManagementApp {

    public String getEmployeeName() {
        return "Asmitha";
    }

    public static void main(String[] args) {
        EmployeeManagementApp app = new EmployeeManagementApp();
        System.out.println("Employee Name: " + app.getEmployeeName());
    }
}