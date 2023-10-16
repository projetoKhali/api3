import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class CryptographyTest {
    @Test
    public void testCrypt() {
        String password = "password123";
        String hash = Critografy.crypt(password);
        assertNotNull(hash);
        assertNotEquals(password, hash);
    }

    @Test
    public void testCheckPw() {
        String password = "password123";
        String hash = Critografy.crypt(password);
        assertTrue(Critografy.checkPw(password, hash));
        assertFalse(Critografy.checkPw("wrongpassword", hash));
    }
}
