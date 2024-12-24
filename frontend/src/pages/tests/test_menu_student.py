from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
import unittest

CHROME_DRIVER_PATH = "D:\\КПІ\\кпі варава\\селеніум\\chromedriver-win64\\chromedriver.exe"

class TestStudentPageMenu(unittest.TestCase):

    def setUp(self):
        # Ініціалізація драйвера для Chrome
        service = Service(CHROME_DRIVER_PATH)
        self.driver = webdriver.Chrome(service=service)
        self.driver.get("http://localhost:5173/student")  # Вставте URL вашої сторінки

    def test_scroll_on_menu_click(self):
        driver = self.driver

        # 1. Пошук елементів за допомогою різних локаторів

        # Локатор по XPath
        menu_item_xpath = driver.find_element(By.XPATH, "//a[@href='#всі-предмети']")
        
        # Локатор по CSS селектору
        menu_item_css = driver.find_element(By.CSS_SELECTOR, "a[href='#всі-предмети']")

        # Локатор по ID
        menu_item_id = driver.find_element(By.ID, "всі-предмети")
        
        # 2. Клік по елементу меню для прокручування
        menu_item_xpath.click()

        # 3. Очікування, що елемент з'явиться на екрані
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "всі-предмети"))
        )
        
        # 4. Перевірка прокрутки сторінки
        element_position = menu_item_id.location
        assert element_position['y'] < driver.execute_script("return window.pageYOffset + window.innerHeight"), "Елемент не потрапив в область видимості!"

        # 5. Перевірка активного класу на елементі меню
        active_menu_item = driver.find_element(By.XPATH, "//a[@href='#всі-предмети']")
        assert "active" in active_menu_item.get_attribute("class"), "Меню не стало активним після натискання!"

    def test_another_menu_item(self):
        driver = self.driver

        # Пошук елемента за допомогою XPath
        menu_item = driver.find_element(By.XPATH, "//a[@href='#технології-devops']")
        menu_item.click()

        # Очікування прокрутки
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "технології-devops"))
        )

        # Перевірка, чи елемент в області видимості
        element_position = driver.find_element(By.ID, "технології-devops").location
        assert element_position['y'] < driver.execute_script("return window.pageYOffset + window.innerHeight"), "Елемент не потрапив в область видимості!"

    def test_table_visibility_after_scroll(self):
        driver = self.driver

        # Перевірка наявності таблиці після прокручування до неї
        menu_item = driver.find_element(By.XPATH, "//a[@href='#основи-інтернету-речей-']")
        menu_item.click()

        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "основи-інтернету-речей-"))
        )

        table = driver.find_element(By.XPATH, "//table[@class='table-container']")
        assert table.is_displayed(), "Таблиця не відображається після прокрутки!"

    def tearDown(self):
        # Закриваємо браузер після тесту
        self.driver.quit()

if __name__  == "__main__":
    unittest.main()