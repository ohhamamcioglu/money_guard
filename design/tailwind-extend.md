This repo doesn't currently include Tailwind out of the box. Below is a ready-to-copy `theme.extend` snippet you can place into `tailwind.config.js` to add the Money Guard tokens.

module.exports = {
  theme: {
    extend: {
      colors: {
        bg: { start: '#1D0E5B', end: '#3C0E7A' },
        glass: 'rgba(255,255,255,.06)',
        'glass-stroke': 'rgba(255,255,255,.18)',
        text: '#E9E7F6',
        muted: '#B9B5D3',
        primary: { start: '#F2B705', end: '#C24DD0' },
        income: '#FFA800',
        expense: '#FF6B6B',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,.35)',
        btn: '0 8px 20px rgba(0,0,0,.25)',
        feather: '0 20px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.10) inset',
      },
      borderRadius: { xl2: '24px' },
      backdropBlur: { 18: '18px' },
    }
  }
}
