// Keep notification helpers available even when toast UI is disabled.
const noop = () => {};

export const showSuccess = noop;
export const showError = noop;
export const showInfo = noop;
export const showWarning = noop;
