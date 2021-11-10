import configureStore from "redux-mock-store";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe("<Reservations />", () => {
  const mockStore = configureStore([]);
  const push = jest.fn();
  it("renders default elements", async () => {
    const store = mockStore();
  });
});
