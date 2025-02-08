/*
----------------------------------------------------------------------------------------------
-- Program:       CPT_200_Cross_Web_Price_Checker
-- Author:        Steven Longhofer
-- Date:          Feb 6, 2025
-- Language:      SQL
-- Description:   This database tracks login information, user activity, product data,
--                search history, and connects stores with specific products and prices.
--                Includes API integration support for store systems.
----------------------------------------------------------------------------------------------
-- Version:       1.0
-- Who/When:      
--  SFL Feb 6, 2025
-- What:          Establish Database
----------------------------------------------------------------------------------------------
-- History:
--  2/6/2025 - Establish Database
*/

-- Create a custom schema to avoid conflicts
CREATE SCHEMA IF NOT EXISTS cpt_200;
SET search_path TO cpt_200;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Login CASCADE;
DROP TABLE IF EXISTS Products CASCADE;
DROP TABLE IF EXISTS Stores CASCADE;
DROP TABLE IF EXISTS Store_Product_Data CASCADE;
DROP TABLE IF EXISTS Search_Histories CASCADE;
DROP TABLE IF EXISTS User_Product_History CASCADE;
DROP TABLE IF EXISTS Store_Product_History CASCADE;
DROP TABLE IF EXISTS Store_API_Keys CASCADE;
DROP TABLE IF EXISTS Store_Syncs CASCADE;
DROP TABLE IF EXISTS Store_API_Logs CASCADE;
DROP TABLE IF EXISTS Store_API_Responses CASCADE;
DROP TABLE IF EXISTS Store_Settings CASCADE;

-- Create the Users table
CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the Login table
CREATE TABLE Login (
    login_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the Products table
CREATE TABLE Products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name TEXT NOT NULL,
    price NUMERIC NOT NULL
);

-- Create the Stores table (central table for store details)
CREATE TABLE Stores (
    store_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_name TEXT NOT NULL,
    store_location TEXT,
    store_type TEXT,
    last_synced TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the Store_Product_Data table to track product details across stores
CREATE TABLE Store_Product_Data (
    store_id UUID REFERENCES Stores(store_id) ON DELETE CASCADE,
    product_id UUID REFERENCES Products(product_id) ON DELETE CASCADE,
    product_details JSONB,
    price NUMERIC NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (store_id, product_id)
);

-- Create the Search_Histories table to track user search activity
CREATE TABLE Search_Histories (
    search_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    search_query TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the User_Product_History table to track user-product interactions
CREATE TABLE User_Product_History (
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    product_id UUID REFERENCES Products(product_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, product_id)
);

-- Create the Store_Product_History table to track product prices across stores
CREATE TABLE Store_Product_History (
    store_id UUID REFERENCES Stores(store_id) ON DELETE CASCADE,
    product_id UUID REFERENCES Products(product_id) ON DELETE CASCADE,
    price NUMERIC NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (store_id, product_id, timestamp)
);

-- Store API Keys table to manage API authentication for each store
CREATE TABLE Store_API_Keys (
    store_id UUID REFERENCES Stores(store_id) ON DELETE CASCADE,
    api_key TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (store_id, api_key) -- Allow multiple API keys per store
);

-- Store Sync table to track API syncs with stores
CREATE TABLE Store_Syncs (
    sync_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES Stores(store_id) ON DELETE CASCADE,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    sync_status TEXT NOT NULL,
    sync_details TEXT
);

-- Store API Log table for tracking API requests and responses
CREATE TABLE Store_API_Logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES Stores(store_id) ON DELETE CASCADE,
    request_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    response_timestamp TIMESTAMP WITH TIME ZONE,
    status TEXT,
    request_details TEXT,
    response_details TEXT,
    error_message TEXT
);

-- Raw API responses for stores
CREATE TABLE Store_API_Responses (
    response_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES Stores(store_id) ON DELETE CASCADE,
    response_data JSONB NOT NULL,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Store-Specific Settings
CREATE TABLE Store_Settings (
    store_id UUID REFERENCES Stores(store_id) ON DELETE CASCADE,
    setting_name TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (store_id, setting_name)
);

-- Indexes for Optimized Queries
CREATE INDEX idx_users_username ON Users(username);
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_products_product_name ON Products(product_name);
CREATE INDEX idx_search_histories_query ON Search_Histories(search_query);
CREATE INDEX idx_store_product_history_timestamp ON Store_Product_History(timestamp);
CREATE INDEX idx_user_product_history_user_product ON User_Product_History(user_id, product_id);

-- GIN Index for JSONB data (if querying specific keys in JSONB)
CREATE INDEX idx_store_product_data_details_jsonb ON Store_Product_Data USING gin (product_details);
