describe('char encode & decode', () => {

  it('should get correct encode result', () => {
    expect('张'.charCodeAt(0)).toBe(24352);

    const buffer = new TextEncoder().encode('张');

    expect(buffer.length).toBe(3);
    expect(buffer[0]).toBe(229);
    expect(buffer[1]).toBe(188);
    expect(buffer[2]).toBe(160);
  });

  it('should get correct decode result', () => {
    const buffer = new Uint8Array([229, 188, 160]);

    expect(new TextDecoder().decode(buffer)).toBe('张');
  });

  it('should ouput usvstring', () => {
    const buffer1 = new TextEncoder().encode('\uD83D');
    const buffer2 = new TextEncoder().encode('\uFFFD');

    expect(buffer1[0]).toBe(buffer2[0]);
    expect(buffer1[1]).toBe(buffer2[1]);
    expect(buffer1[2]).toBe(buffer2[2]);

    const buffer3 = new Uint8Array([239, 191, 189]);

    expect(new TextDecoder().decode(buffer3)).toBe('\uFFFD');
  });

});
