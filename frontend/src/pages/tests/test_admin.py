import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class RegistrationPageTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.quit()

    def test_registration_form(self):
        self.driver.get('http://localhost:5173/signup')  # URL вашої сторінки реєстрації
        wait = WebDriverWait(self.driver, 10)

        try:

            assert "/signup" in self.driver.current_url, "Не вдалося увійти!"

            # Заповнення поля "Прізвище"
            lastName_field = wait.until(EC.presence_of_element_located((By.NAME, 'lastName')))
            lastName_field.send_keys('Test LastName')

            # Заповнення поля "Ім\'я"
            firstName_field = wait.until(EC.presence_of_element_located((By.ID, 'firstName')))
            firstName_field.send_keys('Test FirstName')

            # Заповнення поля "По-батькові"
            middleName_field = wait.until(EC.presence_of_element_located((By.ID, 'middleName')))
            middleName_field.send_keys('Test MiddleName')

            # Заповнення поля "Електронна пошта"
            email_field = wait.until(EC.presence_of_element_located((By.ID, 'email')))
            email_field.send_keys('test@example.com')

            # Заповнення поля "Пароль"
            password_field = wait.until(EC.presence_of_element_located((By.ID, 'password1')))
            password_field.send_keys('Password123')

            # Підтвердження паролю
            confirmPassword_field = wait.until(EC.presence_of_element_located((By.ID, 'confirmPassword')))
            confirmPassword_field.send_keys('Password123')

            # Вибір групи
            group_select = wait.until(EC.presence_of_element_located((By.ID, 'group')))
            group_select.click()
            group_select_option = wait.until(EC.presence_of_element_located((By.XPATH, '//li[text()="ТВ-21"]')))
            group_select_option.click()

            # Натискання кнопки "Зареєструватися"
            submit_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[text()="Зареєструватися"]')))
            submit_button.click()

            print("Тест успішно пройдено!")

        except Exception as e:
            self.fail(f"Registration test failed: {e}")

if __name__ == "__main__":
    unittest.main()
    
