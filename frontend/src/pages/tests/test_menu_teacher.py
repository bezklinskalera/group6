from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

# Шлях до ChromeDriver
CHROME_DRIVER_PATH = "D:\\КПІ\\кпі варава\\селеніум\\chromedriver-win64\\chromedriver.exe"
BASE_URL = "http://localhost:5173/teacher"  # Змініть на ваш локальний або хостинг URL

class TestHeaderTeacher(unittest.TestCase):

    def setUp(self):
        # Налаштування WebDriver
        service = Service(CHROME_DRIVER_PATH)
        self.driver = webdriver.Chrome(service=service)
        self.driver.maximize_window()

    def test_menu_links(self):
        # Відкрити сторінку
        self.driver.get(BASE_URL)
        
        # Перевірка меню з використанням трьох різних локаторів
        menu_items = [
            {"link_text": "Всі групи", "href": "#all-groups", "xpath": "//a[contains(text(), 'Всі групи')]"},
            {"link_text": "ТВ-21", "href": "#tv-21", "xpath": "//a[contains(text(), 'ТВ-21')]"},
            {"link_text": "ТВ-22", "href": "#tv-22", "xpath": "//a[contains(text(), 'ТВ-22')]"},
            {"link_text": "ТВ-23", "href": "#tv-23", "xpath": "//a[contains(text(), 'ТВ-23')]"}
        ]
        
        for item in menu_items:
            # 1. Пошук елемента за допомогою LINK_TEXT
            menu_link = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.LINK_TEXT, item["link_text"]))
            )
            menu_link.click()
            
            # 2. Перевірка, чи правильний URL
            WebDriverWait(self.driver, 10).until(
                EC.url_contains(item["href"])
            )
            self.assertIn(item["href"], self.driver.current_url, f"URL для {item['link_text']} не збігається")

            # 3. Перевірка видимості елемента через XPath
            element = WebDriverWait(self.driver, 10).until(
                EC.visibility_of_element_located((By.XPATH, item["xpath"]))
            )
            self.assertTrue(element.is_displayed(), f"Елемент {item['link_text']} не відображається")

            # 4. Перевірка, чи кнопка доступна для кліку
            clickable_element = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, item["xpath"]))
            )
            self.assertTrue(clickable_element.is_enabled(), f"Кнопка {item['link_text']} не доступна для кліку")

            print(f"Перевірено посилання: {item['link_text']}")

            # Повернутись на головну сторінку
            self.driver.back()

    def tearDown(self):
        # Закрити браузер після тесту
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
