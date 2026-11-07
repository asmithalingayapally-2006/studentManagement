import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class EmployeeManagementAppTest {

    @Test
    public void testEmployeeName() {
        EmployeeManagementApp app = new EmployeeManagementApp();
        assertEquals("Asmitha", app.getEmployeeName());
    }
}

