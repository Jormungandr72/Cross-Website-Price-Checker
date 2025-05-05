import requests
import json
import os

class Ebay:
    def __init__(self, environment="development"):
        self.environment = environment
        # Set the eBay API credentials
        # Note: Replace with your actual eBay App ID
        # For production, use your production App ID
        # For development, use your sandbox App ID
        self.APP_ID = "AdamClar-PriceChe-PRD-c6bd712ea-8fca6684"  # Store the name
        # Set the base URL for the eBay Finding API
        # For production, use the production URL
        # For development, use the sandbox URL
        self.BASE_URL = 'https://svcs.ebay.com/services/search/FindingService/v1'

        self.parameters = params = {
                                    'OPERATION-NAME': 'findItemsByKeywords',
                                    'SERVICE-VERSION': '1.0.0',
                                    'SECURITY-APPNAME': self.APP_ID,
                                    'RESPONSE-DATA-FORMAT': 'JSON',
                                    'REST-PAYLOAD': '',
                                    'keywords': 'Xbox One console',  # Search for Xbox One consoles
                                    'paginationInput.entriesPerPage': 1  # Limit to 1 results
                                }

    def getprice(self, product="xbox one console"):
        # Initialize the return data dictionar
        return_data = {}
        # Set the connection success flag to False initially
        connection_succcess = False 
        # Set the search keyword based on the passed parameter, the default is xbox one consle 
        self.parameters['keywords'] = product
        # Make the API request
        # Note: In a real-world scenario, handle exceptions and errors appropriately
        if self.environment == "production":
            self.BASE_URL = 'https://svcs.ebay.com/services/search/FindingService/v1'
            response = requests.get(self.BASE_URL, params=self.parameters)

            print(response.text)
            # Check if the request was successful
            if response.status_code == 200:
                connection_succcess = True
        else:
            # Construct directory the same regardless of where script is called from
            script_dir = os.path.dirname(os.path.abspath(__file__))
            sample_dir = os.path.join(script_dir, '..', 'resources', 'ebay_sample.json')

            with open(sample_dir, 'r') as f:
                # Simulate the API response for development
                local_data = json.load(f)
                # Check that the stored data is a dictionary and contains the expected key
                if isinstance(local_data, dict) and 'findItemsByKeywordsResponse' in local_data:
                    connection_succcess = True
    
        # Check if the request was successful
        if connection_succcess:
            data = response.json() if self.environment=='production' else local_data

            # Navigate the response structure
            search_result = data.get('findItemsByKeywordsResponse', [{}])[0].get('searchResult', [{}])[0]
            items = search_result.get('item', [])
            
            if items:
                for item in items:
                    
                    title = item.get('title', 'Unknown')
                    
                    price = item.get('sellingStatus', [{}])[0].get('currentPrice', [{}])[0].get('__value__', 'N/A')
                    
                    currency = item.get('sellingStatus', [{}])[0].get('currentPrice', [{}])[0].get('@currencyId', 'USD')
                    
                    print(f"- {title}: {price} {currency}")
                    
                    return_data = { "productList": { "name": title, "price": price, "currency": currency } }

                    return return_data
            else:
                print("No Xbox One consoles found.")
        else:
            print(f"Error fetching data: HTTP {response.status_code}")

            # Return the data
            return return_data
