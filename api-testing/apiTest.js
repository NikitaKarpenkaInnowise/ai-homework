// Custom test utility functions
const expect = (actual) => ({
    toBe: (expected) => {
        if (actual !== expected) {
            throw new Error(`Expected ${expected} but got ${actual}`);
        }
        return true;
    },
    toBeGreaterThanOrEqual: (expected) => {
        if (actual < expected) {
            throw new Error(`Expected ${actual} to be greater than or equal to ${expected}`);
        }
        return true;
    },
    toBeLessThanOrEqual: (expected) => {
        if (actual > expected) {
            throw new Error(`Expected ${actual} to be less than or equal to ${expected}`);
        }
        return true;
    },
    not: {
        toBe: (expected) => {
            if (actual === expected) {
                throw new Error(`Expected ${actual} not to be ${expected}`);
            }
            return true;
        }
    }
});

const test = async (description, testFn) => {
    try {
        await testFn();
        console.log(`✅ PASSED: ${description}`);
    } catch (error) {
        console.error(`❌ FAILED: ${description}`);
        console.error(`   Error: ${error.message}`);
    }
};

// API Tests
const API_URL = 'https://fakestoreapi.com/products';
let products = [];
let defectiveProducts = [];

// Main test execution
async function runTests() {
    console.log('Starting API Tests...\n');

    // Test 1: Server Response
    await test('Server returns status code 200', async () => {
        const response = await fetch(API_URL);
        expect(response.status).toBe(200);
    });

    // Test 2: Data Validation
    await test('Fetch and validate product data', async () => {
        const response = await fetch(API_URL);
        products = await response.json();
        expect(Array.isArray(products)).toBe(true);
    });

    // Test 3: Product Attributes Validation
    await test('Validate product attributes', async () => {
        products.forEach(product => {
            try {
                // Title validation
                if (!product.title || product.title.trim() === '') {
                    throw new Error('Empty title');
                }

                // Price validation
                if (product.price < 0) {
                    throw new Error('Negative price');
                }

                // Rating validation
                if (product.rating && product.rating.rate > 5) {
                    throw new Error('Rating exceeds maximum value of 5');
                }
            } catch (error) {
                defectiveProducts.push({
                    id: product.id,
                    issue: error.message,
                    product: product
                });
            }
        });
    });

    // Display defective products
    console.log('\nDefective Products Report:');
    if (defectiveProducts.length === 0) {
        console.log('No defective products found.');
    } else {
        defectiveProducts.forEach(item => {
            console.log(`\nProduct ID: ${item.id}`);
            console.log(`Issue: ${item.issue}`);
            console.log('Product Details:', JSON.stringify(item.product, null, 2));
        });
    }
}

// Run all tests
runTests().catch(error => {
    console.error('Test execution failed:', error);
}); 