import React from 'react';
import { Award, Building2, TrendingUp, TrendingDown, CheckCircle, Star } from 'lucide-react';
import repsolLogo from '../images/logo repsol.jpg';

const SocialProof = () => {
  const stats = [
    { value: '+500', label: 'Empresas activas', icon: Building2 },
    { value: '40%', label: 'Reducción de costos', icon: TrendingDown },
    { value: '99.7%', label: 'Precisión en alertas', icon: CheckCircle },
    { value: '48hrs', label: 'Implementación', icon: TrendingUp }
  ];

  const achievements = [
    {
      image: 'https://www.iotomato.com/static/innovateLogo-d22940585e16e627cd3b49635ccadf98.svg',
      title: 'Ganadores Innóvate Perú',
      subtitle: 'Fondo Startup-7G',
      description: 'Reconocidos por el gobierno peruano como una de las startups más innovadoras del país.',
      year: '2023'
    },
    {
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc0IiBoZWlnaHQ9Ijg2IiB2aWV3Qm94PSIwIDAgMTc0IDg2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj4KPHBhdGggZD0iTTM4LjYxMTQgMC45NzI1MDlINDMuNTMyNVYyNi42MjE2SDM4LjYxMTRWMC45NzI1MDlaTTAuODM1NDQ5IDI5Ljc3NjJWMzQuMTU2SDguNjIyMjJWNTUuNDI4MUgxMy41ODM2VjM0LjE1MzJIMjEuMzc0MVYyOS43NzI1TDAuODM1NDQ5IDI5Ljc3NjJaTTQ0Ljg1NjIgMC45NzI1MDlWNS4zNTMyNkg1My4yNDlWMjYuNjI2M0g1OC4xNzY3VjUuMzUwNDdINjYuNTY4NlYwLjk2OTcyN0w0NC44NTYyIDAuOTcyNTA5Wk0yMC4wNDk0IDQ0LjIyODFIMjguMzA5M0MyOC4xNjMxIDQxLjg5NjMgMjYuNjA4IDQwLjI4MjQgMjQuMzYxNiA0MC4yODI0QzIxLjc1MTYgNDAuMjgyNCAyMC40ODUgNDEuODI1OCAyMC4wNDk0IDQ0LjIyODFaTTE1LjEyMTggNDYuMjAyOEMxNS4xMjE4IDQwLjc1MDggMTguODY1MyAzNi41MTg0IDI0LjI4NjYgMzYuNTE4NEMzMC4yNjYzIDM2LjUxODQgMzMuNDUxNCA0MS4wMzc0IDMzLjQ1MTQgNDcuNjA0M0gxOS45NzU0QzIwLjMzNjEgNTAuNDM3OSAyMS45MzE1IDUyLjE5NjUgMjQuNzIyMiA1Mi4xOTY1QzI2LjY0MjcgNTIuMTk2NSAyNy43NjUgNTEuMzMzOSAyOC4zMTAyIDQ5LjkzNjFIMzMuMTY1N0MzMi40ODU2IDUzLjIwMTEgMjkuNTQxMiA1NS45NjA1IDI0Ljc1OTcgNTUuOTYwNUMxOC42MDAyIDU1Ljk2MDUgMTUuMTIxOCA1MS42OTIgMTUuMTIxOCA0Ni4xODg5VjQ2LjIwMjhaTTM0LjM3NzkgNDYuMjI2QzM0LjM3NzkgNTEuNzE1MiAzOC4wMzYyIDU1Ljk0NjYgNDMuOTA2MiA1NS45NDY2QzQ4Ljg3MTMgNTUuOTQ2NiA1MS45NDg4IDUyLjgyNzMgNTIuMjc1NyA0OC45MTU5SDQ3LjUyNzlDNDcuMTg3IDUwLjk5NzIgNDUuNzg4MyA1Mi4wMzUyIDQzLjc4NDUgNTIuMDM1MkM0MC43NzU0IDUyLjAzNTIgMzkuMzU5OSA0OS43MDMzIDM5LjM1OTkgNDYuMjIyM0MzOS4zNTk5IDQyLjY3MTcgNDAuODgxMyA0MC40MTA0IDQzLjg1MTkgNDAuNDEwNEM0NC42NjgxIDQwLjQwMDEgNDUuNDYwOSA0MC42ODA2IDQ2LjA4NTYgNDEuMjAwN0M0Ni43MTA0IDQxLjcyMDkgNDcuMTI1NSA0Mi40NDYxIDQ3LjI1NTMgNDMuMjQ0SDUyLjA3NTJDNTEuNDIyMyAzOS4yNjExIDQ4LjQ1MDcgMzYuNTA0NSA0My42MzQ2IDM2LjUwNDVDMzcuOTgyOCAzNi41MDQ1IDM0LjM2MTEgNDAuNzM2OSAzNC4zNjExIDQ2LjIyNkgzNC4zNzc5Wk01OC4xNDY3IDI5Ljc2MjNINTMuMjM1OVY1NS40MTE0SDU4LjE2MzZWNDQuOTY1NUM1OC4xNjM2IDQyLjQ1NTYgNTkuNzU2MSA0MC43MzQxIDYxLjkzMTQgNDAuNzM0MUM2My45OTcxIDQwLjczNDEgNjUuMTU3OCA0Mi4xMzE5IDY1LjE1NzggNDQuMTAyOVY1NS40MDEySDcwLjA4NTRWNDMuNDA5MUM3MC4wODU0IDM5LjM5MjkgNjcuNTEyOSAzNi41MjIxIDYzLjY3MzkgMzYuNTIyMUM2MS4xMzc5IDM2LjUyMjEgNTkuNjE3NSAzNy40ODg2IDU4LjI3NiAzOS40MjYySDU4LjE2NzNMNTguMTQ2NyAyOS43NjIzWk03Ni4zODQ1IDM3LjAxSDcxLjU3ODdWNTUuNDEyM0g3Ni41MDcyVjQ0Ljk2NDZDNzYuNTA3MiA0Mi40NTQ2IDc4LjA5OTggNDAuNzMzMSA4MC4yNzUxIDQwLjczMzFDODIuMzQwOCA0MC43MzMxIDgzLjUwMTUgNDIuMTMwOSA4My41MDE1IDQ0LjEwMTlWNTUuNDAwMkg4OC40MTg4VjQzLjQwOTFDODguNDE4OCAzOS4zOTI5IDg1Ljg0NjMgMzYuNTIyMSA4Mi4wMDczIDM2LjUyMjFDNzkuNDcxMyAzNi41MjIxIDc3Ljc3MDEgMzcuNTYyOCA3Ni41MDA3IDM5LjUzMzhINzYuMzkyTDc2LjM4NDUgMzcuMDEwOVYzNy4wMVpNMTAzLjc1OCA0Ni4yNTAxQzEwMy43NTggNDIuNjYwNiAxMDIuMDU2IDQwLjIyNDkgOTkuMDQ2OSA0MC4yMjQ5Qzk2LjAzODggNDAuMjI0OSA5NC4zMzY2IDQyLjY2NDMgOTQuMzM2NiA0Ni4yNTAxQzk0LjMzNjYgNDkuODM1IDk2LjAwNDEgNTIuMjQxMSA5OS4wNDY5IDUyLjI0MTFDMTAyLjA5IDUyLjI0MTEgMTAzLjc1NyA0OS44Mzg4IDEwMy43NTcgNDYuMjQ5MkwxMDMuNzU4IDQ2LjI1MDFaTTg5LjMzNzggNDYuMjQ5MkM4OS4zMzc4IDQwLjc2MSA5My4yODU1IDM2LjUyODYgOTkuMDQ2OSAzNi41Mjg2QzEwNC44MDggMzYuNTI4NiAxMDguNzU3IDQwLjc2MSAxMDguNzU3IDQ2LjI0OTJDMTA4Ljc1NyA1MS43MzgzIDEwNC44MDkgNTUuOTcwNyA5OS4wNDY5IDU1Ljk3MDdDOTMuMjg1NSA1NS45NzA3IDg5LjMzNzggNTEuNzI4MSA4OS4zMzc4IDQ2LjI1MDFWNDYuMjQ5MlpNMTA5Ljc1NyA1NS40MzE4SDExNC42ODVWMjkuNzc2MkgxMDkuNzc0TDEwOS43NTcgNTUuNDMxOFpNMTMwLjEzNiA0Ni4yNDkyQzEzMC4xMzYgNDIuNjYxNSAxMjguNDM1IDQwLjIyNDkgMTI1LjQyNiA0MC4yMjQ5QzEyMi40MTggNDAuMjI0OSAxMjAuNzE1IDQyLjY1NSAxMjAuNzE1IDQ2LjI1MDFDMTIwLjcxNSA0OS44NDUyIDEyMi4zODMgNTIuMjQxMSAxMjUuNDI2IDUyLjI0MTFDMTI4LjQ2OCA1Mi4yNDExIDEzMC4xMzYgNDkuODM4OCAxMzAuMTM2IDQ2LjI0OTJaTTExNS43MTYgNDYuMjQ5MkMxMTUuNzE2IDQwLjc2MSAxMTkuNjY0IDM2LjUyODYgMTI1LjQyNiAzNi41Mjg2QzEzMS4xODcgMzYuNTI4NiAxMzUuMTM2IDQwLjc2MSAxMzUuMTM2IDQ2LjI0OTJDMTM1LjEzNiA1MS43MzgzIDEzMS4xODggNTUuOTcwNyAxMjUuNDI2IDU1Ljk3MDdDMTE5LjY2NCA1NS45NzA3IDExNS43MTYgNTEuNzI4MSAxMTUuNzE2IDQ2LjI1MDFWNDYuMjQ5MlpNMTQ5LjI2NiA0NS40MjQ2QzE0OS4yNjYgNDIuNzI4MyAxNDcuODE1IDQwLjQzNzMgMTQ0Ljg0MSA0MC40MzczQzE0Mi4zNCA0MC40MzczIDE0MC42NzYgNDIuMzc0OSAxNDAuNjc2IDQ1LjQ1OEMxNDAuNjc2IDQ4LjU0MTEgMTQyLjM0MyA1MC40MDczIDE0NC44NzggNTAuNDA3M0MxNDcuOTk2IDUwLjQwNzMgMTQ5LjI2MyA0OC4xNDY5IDE0OS4yNjMgNDUuNDIwOUwxNDkuMjY2IDQ1LjQyNDZaTTEzNi4yNTUgNTUuOTY3SDE0MS4xNDVDMTQxLjU0MyA1Ny4xMTcxIDE0Mi41OTUgNTguMDEzMSAxNDQuODg5IDU4LjAxMzFDMTQ3LjY4IDU4LjAxMzEgMTQ5LjAyIDU2LjY4NDkgMTQ5LjAyIDU0LjE3NVY1Mi4xNTNIMTQ4LjkxMUMxNDguMzIzIDUyLjg1NzIgMTQ3LjU3OSA1My40MTc4IDE0Ni43MzcgNTMuNzkxM0MxNDUuODk1IDU0LjE2NDggMTQ0Ljk3NyA1NC4zNDEyIDE0NC4wNTUgNTQuMzA2N0MxMzkuOTI0IDU0LjMwNjcgMTM1Ljg2NyA1MS4wNzg5IDEzNS44NjcgNDUuNTE4M0MxMzUuODY3IDQwLjAyOTEgMTM5LjE5OSAzNi41MTQ3IDE0My45MDkgMzYuNTE0N0MxNDYuMjI3IDM2LjUxNDcgMTQ3LjkzMiAzNy40MTE2IDE0OS4wNTUgMzguOTU0MUgxNDkuMTI2VjM3LjAxNzRIMTUzLjg3NFY1NC4wMTkyQzE1My44NzQgNTYuNjAxNCAxNTMuMDQgNTguMzYgMTUxLjY2NSA1OS42MTY4QzE1MC4xMDYgNjEuMDUxNyAxNDcuNzE3IDYxLjY5NTQgMTQ0Ljk2NCA2MS42OTU0QzEzOS44OTMgNjEuNjk1NCAxMzYuNzc2IDU5LjU0MjYgMTM2LjI2OCA1NS45Njc5TDEzNi4yNTUgNTUuOTY3Wk0xNTYuNDI2IDYxLjQ1NjFIMTU5LjMyNkMxNjMuMDkzIDYxLjQ1NjEgMTY0LjQ3MSA1OS45ODc4IDE2NS44ODQgNTUuODk2NUwxNzIuMzcgMzcuMDI3NkgxNjcuMzk1TDE2NC43ODUgNDUuMzEzM0MxNjQuMjA2IDQ2Ljk5NzcgMTYzLjY5OCA0OS4zMjk1IDE2My42OTggNDkuMzI5NUgxNjMuNjMxQzE2My42MzEgNDkuMzI5NSAxNjMuMDE1IDQ2Ljk5NzcgMTYyLjQzNiA0NS4zMTMzTDE1OS42ODMgMzcuMDI3NkgxNTQuNDk3TDE1OS40OTYgNTAuMTIxN0MxNjAuNTQ4IDUyLjkxODIgMTYwLjkwOCA1NC4xMDQ1IDE2MC45MDggNTUuMTA4MUMxNjAuOTA4IDU2LjYxNDQgMTYwLjExMiA1Ny42MTg5IDE1OC4xNTQgNTcuNjE4OUgxNTYuNDE2TDE1Ni40MjYgNjEuNDU2MVpNMTMuNzU4NyA3MC4wOTI0SDIwLjA3MUMyMi44MjUyIDcwLjA5MjQgMjQuMjMzMiA2OC44MzkzIDI0LjIzMzIgNjYuNTc4QzI0LjIzMzIgNjQuMjQ2MiAyMi43NDkzIDYzLjA5NzkgMjAuMTQ4NyA2My4wOTc5SDEzLjc1NzhWNzAuMDkyNEgxMy43NTg3Wk0xOC45MTEyIDc0LjMyNDdIMTMuNzU4N1Y4NC4yMjQzSDguNjE1NjZWNTguNTc5OEgyMC4yODU1QzIzLjU4NjggNTguNTc5OCAyNS41NDEgNTkuNDM4NyAyNy4wNjE1IDYwLjk4MjJDMjcuODA3IDYxLjcwNTggMjguMzk2OCA2Mi41NzE1IDI4Ljc5NTEgNjMuNTI3MUMyOS4xOTM1IDY0LjQ4MjYgMjkuMzkyMSA2NS41MDgxIDI5LjM3OTEgNjYuNTQxOEMyOS4zNzkxIDcwLjEzMTQgMjcuNTE0OSA3Mi41ODM4IDI0LjI1MzggNzMuNjU4OEwzMC43MTk3IDg0LjIyNTNIMjQuOTM0OUwxOC45MTEyIDc0LjMyNTdWNzQuMzI0N1pNMzQuMDA3OSA3My4wMzQ1SDQyLjI2NjhDNDIuMTIwNyA3MC43MDI3IDQwLjU2NTYgNjkuMDg4OCAzOC4zMTkxIDY5LjA4ODhDMzUuNzA5MSA2OS4wODg4IDM0LjQ0MzUgNzAuNjMyMiAzNC4wMDc5IDczLjAzNDVaTTI5LjA4MDMgNzUuMDA1NkMyOS4wODAzIDY5LjU1MzUgMzIuODIyOCA2NS4zMjIxIDM4LjI0NDIgNjUuMzIyMUM0NC4yMjM4IDY1LjMyMjEgNDcuNDA5OSA2OS44MzkyIDQ3LjQwOTkgNzYuNDA0M0gzMy45MzJDMzQuMjkyNyA3OS4yMzc5IDM1Ljg4OSA4MC45OTY1IDM4LjY3ODggODAuOTk2NUM0MC41OTkzIDgwLjk5NjUgNDEuNzIxNiA4MC4xMzc2IDQyLjI2NjggNzguNzM1Mkg0Ny4xMjIzQzQ2LjQ0MjIgODIuMDAwMSA0My40OTg3IDg0Ljc2MDQgMzguNzE2MyA4NC43NjA0QzMyLjU1NjggODQuNzYwNCAyOS4wNzg0IDgwLjQ5MSAyOS4wNzg0IDc0Ljk4ODlMMjkuMDgwMyA3NS4wMDU2Wk01Mi44MzQgODQuMjA3Nkg1Ny41NDQzTDY0LjQ0MyA2NS44MDI2SDU5LjUxODJMNTUuMjY1MSA3OC4yNjk1SDU1LjE5MjlMNTAuOTgyOSA2NS44MjU3SDQ1Ljk3MzhMNTIuODMzMSA4NC4yMDc2SDUyLjgzNFpNNjUuMTU0IDg0LjIwNzZINzAuMDgxN1Y2NS44MjU3SDY1LjE1NFY4NC4yMDc2Wk02NS4xNTQgNjQuNTQySDcwLjA4MTdWNjAuMTYxM0g2NS4xNTRWNjQuNTQzOVY2NC41NDJaTTc2LjA5NiA3My4wMTY5SDg0LjM1NDlDODQuMjA4OCA3MC42ODUxIDgyLjY1MzcgNjkuMDcxMiA4MC40MDcyIDY5LjA3MTJDNzcuNzk3MiA2OS4wNzEyIDc2LjUzMTYgNzAuNjEzNyA3Ni4wOTYgNzMuMDE2OVpNNzEuMTY4NCA3NC45ODc5QzcxLjE2ODQgNjkuNTM1OSA3NC45MTA5IDY1LjMwNDUgODAuMzMyMiA2NS4zMDQ1Qzg2LjMwOTEgNjUuMzA0NSA4OS40OTggNjkuODIxNiA4OS40OTggNzYuMzg1N0g3Ni4wMjAxQzc2LjM4MDggNzkuMjIwMyA3Ny45NzcxIDgwLjk3ODkgODAuNzY2OSA4MC45Nzg5QzgyLjY4NzQgODAuOTc4OSA4My44MDk3IDgwLjEyIDg0LjM1NDkgNzguNzM1Nkg4OS4yMTA0Qzg4LjUzMDMgODEuOTgyNSA4NS41ODU5IDg0Ljc0MjggODAuODA0NCA4NC43NDI4Qzc0LjY0NDkgODQuNzQyOCA3MS4xNjY1IDgwLjQ3MzQgNzEuMTY2NSA3NC45NzEyTDcxLjE2ODQgNzQuOTg3OVpNOTMuNjg2NSA4NC4xOUg5OC4xNDQ3TDEwMS41NDcgNzIuMTMwMkgxMDEuNjE5TDEwNC45MTcgODQuMTlIMTA5LjQwOUwxMTQuOTYzIDY1LjgyNTdIMTEwLjE3NUwxMDYuOTg2IDc3LjU4NkgxMDYuOTE0TDEwMy42MTcgNjUuODM1OUg5OS40MTQxTDk2LjI5NjQgNzcuNTg2SDk2LjIyNTJMOTMuMTYxOCA2NS44MzU5SDg4LjI1NDhMOTMuNjg2NSA4NC4xOVpNMjkuMjAxMSAwLjk3MjUwOUwyMy4wNzUzIDE5Ljc3NTVMMTYuNjc0MSAwLjk3MjUwOUg4LjYxNDcyVjI2LjYyMTZIMTMuMzc5M1Y2LjMxMzI1TDIwLjM2MzMgMjYuNjIxNkgyNS4zOTk2TDMyLjA2MDMgNi4zMTMyNVYyNi42MjE2SDM2Ljk1MDRWMC45NzI1MDlIMjkuMjAxMVoiIGZpbGw9ImJsYWNrIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iMTcyLjM3MyIgaGVpZ2h0PSI4NS4zMzMyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC44MzA1NjYgMC4wODAwNzgxKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=',
      title: 'MIT Technology Review',
      subtitle: 'Innovadores menores de 35',
      description: 'Reconocimiento internacional por nuestro impacto tecnológico en Latinoamérica.',
      year: '2020'
    },
    {
      image: 'https://www.iotomato.com/static/cideLogo-0545f5e2bf706ee988ea3d4238bcabf7.png',
      title: 'Respaldados por CIDE PUCP',
      subtitle: 'Incubadora de negocios',
      description: 'Parte del ecosistema de innovación de la Pontificia Universidad Católica del Perú.',
      year: '2019'
    }
  ];

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestros
            <span style={{ color: '#DC0F1A' }}> clientes </span>
          </h2>
          <p className="text-xl text-gray-600">
            Desde startups hasta corporaciones multinacionales, empresas líderes confían en iotomato.
          </p>
        </div>

        {/* Featured Client - Repsol */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 mb-16 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-50 rounded-full px-4 py-2 mb-6">
                <Building2 className="w-4 h-4" style={{ color: '#DC0F1A' }} />
                <span className="text-sm font-semibold" style={{ color: '#DC0F1A' }}>
                  Cliente destacado
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Repsol confía en iotomato
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Una de las principales empresas energéticas multinacionales utiliza nuestra plataforma para optimizar su consumo energético y reducir costos operativos.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 font-medium">Monitoreo 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 font-medium">Múltiples instalaciones</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 font-medium">Alertas en tiempo real</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 shadow-xl">
                <img 
                  src={repsolLogo} 
                  alt="Repsol" 
                  className="h-24 w-auto mx-auto object-contain" 
                />
                <p className="text-center text-sm text-gray-500 mt-4">
                  Energía global • Multinacional
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-12" id="SocialProof">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Premios y Reconocimientos
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                >
                  {/* Year badge */}
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: '#DC0F1A' }}
                  >
                    {achievement.year}
                  </div>

                  {/* Image */}
                  <div className="h-16 flex items-center justify-start mb-6">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="h-full w-auto object-contain" 
                    />
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h4>
                  <p 
                    className="text-sm font-semibold mb-3"
                    style={{ color: '#DC0F1A' }}
                  >
                    {achievement.subtitle}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}>
                <CheckCircle className="w-6 h-6" style={{ color: '#DC0F1A' }} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Certificado por</p>
                <p className="font-bold text-gray-900">Innóvate Perú</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}>
                <Building2 className="w-6 h-6" style={{ color: '#DC0F1A' }} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Incubado en</p>
                <p className="font-bold text-gray-900">CIDE PUCP</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 15, 26, 0.1)' }}>
                <Star className="w-6 h-6" style={{ color: '#DC0F1A' }} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Reconocido por</p>
                <p className="font-bold text-gray-900">MIT Tech Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Únete a las empresas que ya están optimizando su energía
          </p>
          <button 
            onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#DC0F1A',
              boxShadow: '0 10px 40px rgba(220, 15, 26, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B00D16'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC0F1A'}
          >
            Solicitar Servicio
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;