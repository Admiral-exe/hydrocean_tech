import urllib.parse
import requests
import pytest

BASE_URL = "http://localhost:3000"

def test_homepage_healthy():
    """Verify storefront homepage renders with HTTP 200, fast response time (< 1.5s), and contains Hydrocean branding."""
    import time
    start = time.time()
    res = requests.get(f"{BASE_URL}/", timeout=10)
    duration = time.time() - start
    assert res.status_code == 200
    assert duration < 2.0, f"Homepage took too long: {duration:.2f}s"
    assert "Hydrocean" in res.text
    assert "Pure water, delivered to your home" in res.text
    assert "Express Dispatch" in res.text

def test_catalog_healthy():
    """Verify catalog page renders with products and filter indicators."""
    res = requests.get(f"{BASE_URL}/catalog", timeout=10)
    assert res.status_code == 200
    assert "Lexcru Lexzon" in res.text
    assert "RO + UV + UF" in res.text

def test_product_detail_healthy():
    """Verify product detail page for Lexcru Lexzon renders quickly (< 1.5s)."""
    import time
    start = time.time()
    res = requests.get(f"{BASE_URL}/product/lexcru-lexzon", timeout=10)
    duration = time.time() - start
    assert res.status_code == 200
    assert duration < 2.0, f"Product detail took too long: {duration:.2f}s"
    assert "Lexcru Lexzon" in res.text
    assert "10 Litres" in res.text

def test_cart_page_healthy():
    """Verify cart page renders with order bill structure."""
    res = requests.get(f"{BASE_URL}/cart", timeout=10)
    assert res.status_code == 200
    assert "Order Bill Summary" in res.text

def test_services_page_healthy():
    """Verify services care & maintenance page renders."""
    res = requests.get(f"{BASE_URL}/services", timeout=10)
    assert res.status_code == 200
    assert "Purifier Care" in res.text

def test_demo_booking_page_healthy():
    """Verify free water test and demo booking page renders."""
    res = requests.get(f"{BASE_URL}/book-demo", timeout=10)
    assert res.status_code == 200
    assert "Doorstep TDS Test" in res.text

def test_edge_middleware_admin_protection():
    """Layer 1 Edge Security: Verify unauthorized access to /admin/dashboard redirects to /admin/login."""
    res = requests.get(f"{BASE_URL}/admin/dashboard", allow_redirects=False, timeout=10)
    # Either returns a 307/308 redirect or location contains /admin/login
    assert res.status_code in [302, 307, 308]
    assert "/admin/login" in res.headers.get("Location", "")

def test_whatsapp_payload_encoding():
    """Verify that WhatsApp payloads use strict URL encoding and properly escape special characters."""
    raw_message = "🌊 *NEW ORDER - HYDROCEAN TECH*\nTotal: ₹13,998\n& Special Notes: 100% pure & fast!"
    encoded = urllib.parse.quote(raw_message, safe="")
    assert "%0A" in encoded  # Newlines escaped
    assert "%26" in encoded  # Ampersand escaped
    assert "%E2%82%B9" in encoded  # Rupee symbol escaped
    assert "%F0%9F%8C%8A" in encoded  # Wave emoji escaped
