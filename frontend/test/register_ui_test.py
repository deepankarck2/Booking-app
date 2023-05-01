import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

class RegisterUITest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())
        self.driver.get("http://localhost:3000/register")

    def test_register_form(self):
        driver = self.driver

        username_input = driver.find_element_by_id("reg-username")
        email_input = driver.find_element_by_id("reg-email")
        password_input = driver.find_element_by_id("reg-password")

        username_input.send_keys("testuser3")
        email_input.send_keys("testuser3@email.com")
        password_input.send_keys("testpassword3")

        submit_button = driver.find_element_by_id("reg-submit")
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
