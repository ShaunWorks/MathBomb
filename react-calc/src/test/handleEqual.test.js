import App from '../App';

test('testing how to test state', () => {
    const app = new App();
    app.setState({input: '8.4*3'},
    expect(app.state.input).toBe('25.2')
    );
});