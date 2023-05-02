from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Start the Chrome driver with desired options
options = Options()
options.add_argument("--headless")  # Run in headless mode to avoid opening a browser window

driver = webdriver.Edge()

# Navigate to the website and measure the page load time
#url = "http://localhost:3001/"  # Replace with the URL of the website you want to measure
latencies = []
for i in range(10):  # Measure the page load time 10 times and calculate the average
    start_time = time.monotonic()
    driver.get("http://localhost:3000/")
    WebDriverWait(driver, 10).until(EC.title_contains("React App"))
    end_time = time.monotonic()
    latency = end_time - start_time
    latencies.append(latency)
    print(f"Page loaded in {latency:.3f} seconds")

# Calculate the average latency
avg_latency = sum(latencies) / len(latencies)
print(f"Average latency: {avg_latency:.3f} seconds")

# Quit the driver
driver.quit()