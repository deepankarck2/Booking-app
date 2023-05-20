import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from credentials import username, email, password

class RegisterUITest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())
        self.driver.get("http://localhost:3000/register")

    def test_register_form(self):
        driver = self.driver

        username_input = driver.find_element(By.ID, "reg-username")
        email_input = driver.find_element(By.ID, "reg-email")
        password_input = driver.find_element(By.ID, "reg-password")

        username_input.send_keys(username)
        email_input.send_keys(email)
        password_input.send_keys(password)

        submit_button = driver.find_element(By.ID, "reg-submit")
        submit_button.click()

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='example@example.com']"))
        )
        current_url = driver.current_url
        self.assertTrue("login" or "register" in current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()

