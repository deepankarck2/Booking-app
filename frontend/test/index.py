import sys
import unittest

from login_ui_test import LoginUITest
from register_ui_test import RegisterUITest
from addHouse_ui_test import LoginAndAddHouseTest

if __name__ == "__main__":
    # Initialize the test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    # Add the test cases
    suite.addTests(loader.loadTestsFromTestCase(RegisterUITest))
    suite.addTests(loader.loadTestsFromTestCase(LoginUITest))
    suite.addTests(loader.loadTestsFromTestCase(LoginAndAddHouseTest)) 

    # Print the initialization message
    print("Running UI tests...\n")

    # Run the test cases
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)