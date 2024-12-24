from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Шлях до ChromeDriver (якщо не додано до PATH)
CHROME_DRIVER_PATH = "D:\\КПІ\\кпі варава\\селеніум\\chromedriver-win64\\chromedriver.exe"

# URL вашого проєкту
BASE_URL = "http://localhost:5173/signin"  # Змініть на ваш локальний або хостинг URL

# Тест для сторінки логіну
def test_login_page():
    # Налаштування WebDriver
    service = Service(CHROME_DRIVER_PATH)
    driver = webdriver.Chrome(service=service)
    driver.maximize_window()
    
    try:
        # 1. Відкрити сторінку логіну
        driver.get(BASE_URL)
        print("Відкрито сторінку логіну")

        # 2. Ввести email
        email_field = driver.find_element(By.ID, "email")
        email_field.send_keys("polishchuk.maryna@gmail.com")
        print("Введено email")

        # 3. Ввести пароль
        password_field = driver.find_element(By.NAME, "password")
        password_field.send_keys("password123")
        print("Введено пароль")

        # 4. Натиснути кнопку "Увійти"
        login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Увійти')]")
        login_button.click()
        print("Натиснуто кнопку 'Увійти'")

        # 5. Дочекатися перенаправлення на сторінку студента
        WebDriverWait(driver, 10).until(
            EC.url_contains("/student")
        )
        print("Перенаправлено на сторінку студента")

        # 6. Перевірити, чи URL містить "/student"
        assert "/student" in driver.current_url, "Не вдалося увійти!"
        print("Тест успішно пройдено!")
    
    except Exception as e:
        print(f"Тест провалено: {e}")
    
    finally:
        # Закрити браузер
        driver.quit()

if __name__ == "__main__":
    test_login_page()
