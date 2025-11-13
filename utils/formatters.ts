export const FormatUtils = {
  // This is the function we want to mock
  formatDate: (dateString: string) => {
    if (!dateString) return "N/A";
    // In reality, this would be complex date logic
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  },
  // Another internal function that should NOT be mocked
  formatName: (firstName: string, lastName: string) =>
    `${lastName}, ${firstName}`,
};
