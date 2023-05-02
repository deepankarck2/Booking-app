import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

class LoginAndRegisterUITest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())

    def test_login_and_register_forms(self):
        driver = self.driver

        # Test registration form
        driver.get("http://localhost:3000/register")

        username_input = driver.find_element(By.ID, "reg-username")
        email_input = driver.find_element(By.ID, "reg-email")
        password_input = driver.find_element(By.ID, "reg-password")

        username_input.send_keys("testuserr8")
        email_input.send_keys("testuserr8@email.com")
        password_input.send_keys("testuserr8")

        submit_button = driver.find_element(By.ID, "reg-submit")
        submit_button.click()

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='example@example.com']"))
        )
        current_url = driver.current_url
        self.assertTrue("login" or "register" in current_url)

        # Test login form
        driver.get("http://localhost:3000/login")

        email_input = driver.find_element(By.ID, "login-email")
        password_input = driver.find_element(By.ID, "login-password")

        email_input.send_keys("testuserr8@email.com")
        password_input.send_keys("testuserr8")

        submit_button = driver.find_element(By.ID, "login-submit")
        submit_button.click()

        WebDriverWait(driver, 10).until(
            EC.url_contains("/dashboard")
        )
        current_url = driver.current_url
        self.assertTrue("dashboard" or "login" in current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
