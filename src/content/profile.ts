import { reveal } from '@/lib/obfuscate'

/**
 * Contact details are stored encoded (see `@/lib/obfuscate`) and only decoded
 * in the browser, to keep them away from address-harvesting bots.
 */
export const profile = {
  name: 'Brahan Kessel Fopa',
  monogram: 'bkf.',
  get whatsappNumber() {
    return reveal('OTE3NDUxMDQ2NzMy')
  },
  get phoneDisplay() {
    return reveal('OTE3IDQ1MSAwNDYgNzMyKw==')
  },
  get email() {
    return reveal('bW9jLmxpYW1nQGxlc3Nla25haGFyYmFwb2Y=')
  },
  github: 'https://github.com/fopabrahankessel-cmd',
  linkedin: 'https://www.linkedin.com/in/fopa-tseutchoua-657b10318',
  cvPath: '/cv/Brahan-Kessel-Fopa-CV.pdf',
  cvFileName: 'Brahan-Kessel-Fopa-CV.pdf',
} as const
