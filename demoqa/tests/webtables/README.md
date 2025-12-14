# DemoQA Web Tables Tests

This folder contains comprehensive Playwright tests for the DemoQA Web Tables feature using the Page Object Model (POM) pattern with dynamic locators.

## Features

### Test Coverage

1. **Add a New Record** - Creates a new employee record with all required fields
2. **Search for a Record** - Tests search functionality by first name
3. **Edit an Existing Record** - Updates record information
4. **Delete a Record** - Removes a record from the table
5. **Complete CRUD Workflow** - Full cycle of Create, Read, Update, Delete operations
6. **Multiple Records** - Adds multiple records and verifies table population

### Key Implementation Details

#### Page Object Model (POM)
- `WebTablesPage.ts` contains all interactions with the Web Tables UI
- Encapsulates all locators and action methods
- Provides reusable methods for common operations

#### Dynamic Locators
- Uses XPath with dynamic parameters for finding rows, edit/delete buttons
- Example: `//div[contains(text(), '${firstName}')]//..//span[@title='Delete']`
- Allows flexible record targeting based on any field value

#### Table Record Interface
```typescript
interface TableRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}
```

## Test Methods

### WebTablesPage Methods

- `navigateToWebTables()` - Navigate to the Web Tables page
- `addRecord(record: TableRecord)` - Add a new record
- `searchRecord(firstName: string)` - Search records by first name
- `editRecord(firstName: string, updatedRecord: TableRecord)` - Edit existing record
- `deleteRecord(firstName: string)` - Delete a record
- `isRecordVisible(record: TableRecord)` - Check if record is visible
- `isRecordDeleted(firstName: string)` - Verify record deletion
- `getRecordData(firstName: string)` - Retrieve record data as array
- `clearSearch()` - Clear search filter
- `getTableRows()` - Get count of table rows

## Running Tests

### Run all Web Tables tests
```bash
npx playwright test tests/webtables/webTables.spec.ts
```

### Run with browser visible
```bash
npx playwright test tests/webtables/webTables.spec.ts --headed
```

### Run in debug mode
```bash
npx playwright test tests/webtables/webTables.spec.ts --debug
```

### Run in UI mode
```bash
npx playwright test tests/webtables/webTables.spec.ts --ui
```

### View test report
```bash
npx playwright show-report
```

## Test Structure

Each test follows this pattern:
1. **Setup** - Navigate to Web Tables page
2. **Action** - Perform CRUD operation (Create, Read, Update, Delete)
3. **Verification** - Verify the operation succeeded using assertions

## Dynamic Locators Example

The page object uses dynamic locators to handle variable data:

```typescript
// Find edit button for specific employee
private editButtonSelector = (firstName: string) => 
  `//div[contains(text(), '${firstName}')]//..//span[@title='Edit']`;

// Find row containing specific employee
private tableRowSelector = (firstName: string) => 
  `//div[@class='rt-tr-group' and .//div[contains(text(), '${firstName}')]]`;
```

This approach allows tests to work with any employee name without hardcoding locators.

## Test Data

Tests use realistic employee data:
- Names: John Anderson, Sarah Mitchell, Michael Johnson, etc.
- Emails: First.Last@example.com format
- Ages: 27-41
- Salaries: $60,000-$100,000
- Departments: IT, Marketing, Finance, HR, Operations, Design, Development, Support, Management, Executive

## Assertions

Tests verify:
- Records are successfully added to table
- Records can be found via search
- Record data is correctly updated after edit
- Records are deleted and no longer visible
- All fields contain expected values
- Table row count increases appropriately

## Performance

Average test execution time: ~28 seconds for all 6 tests
- Tests run in parallel (4 workers default)
- Modal wait times optimized for stability
- Search results include 500ms buffer for filtering

## Future Enhancements

- Add pagination navigation tests
- Add sorting verification
- Add validation for invalid inputs
- Add bulk operations tests
- Add data export functionality tests
