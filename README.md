## TypeScript Utility Library

**Welcome to the TypeScript Utility Library!** This library provides useful functions and classes for handling common date and time operations, as well as data manipulation.

### Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * [DateTimeUtils](#datetimeutils)
  * [DataUtils](#datautils)
* [Contributing](#contributing)
* [License](#license)

### Installation

To install the library, use npm or yarn:

```
npm install helper-kit
```
or
```
yarn add helper-kit
```

### Usage
#### DateTimeUtils
DateTimeUtils provides functions for common date and time operations.

##### Example
```
import { DateTimekit } from 'helper-kit';

// Create a new instance
const dateUtils = new DateTimekit();

// Check if a date is a public holiday
const isHoliday = dateUtils.isPublicHoliday(new Date(2024, 7, 25));
console.log(`Is public holiday: ${isHoliday}`);

// Format a date
const formattedDate = dateUtils.formatDate(new Date());
console.log(`Formatted Date: ${formattedDate}`);

```

#### DataUtils
DataUtils includes functions for data manipulation and transformation.

#### Example:
```
import { DataToolkit } from 'helper-kit';

// Use DataUtils methods
const dataUtils = new DataToolkit();
const mergeObjects = dataUtils.deepMerge(obj1, obj2);
console.log(mergeObjects);
```
## Contributing

We welcome contributions to the library! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a new Pull Request.

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This library is licensed under the MIT License.
