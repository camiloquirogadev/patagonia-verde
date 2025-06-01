// src/hooks/__tests__/useFirmsData.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFirmsData } from '../useFirmsData';
import { server } from '../../../mocks/server';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useFirmsData', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('debe cargar los datos correctamente', async () => {
    const { result } = renderHook(() => useFirmsData(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    
    expect(result.current.error).toBeNull();
    expect(result.current.fires).toHaveLength(3); // Ajusta según tus datos de prueba
    expect(result.current.fires[0]).toHaveProperty('id');
    expect(result.current.fires[0]).toHaveProperty('latitude');
    expect(result.current.fires[0]).toHaveProperty('longitude');
  });

  it('debe manejar errores correctamente', async () => {
    server.use(
      rest.get('/api/fires', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useFirmsData(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).not.toBeNull();
  });
});