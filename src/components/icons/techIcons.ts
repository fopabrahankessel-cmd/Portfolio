import type { IconType } from 'react-icons'
import { DiMsqlServer } from 'react-icons/di'
import { FaJava } from 'react-icons/fa'
import {
  SiDjango,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiFlyway,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJunit5,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSpringsecurity,
  SiSqlite,
  SiTypescript,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'

import type { TechId } from '@/content/types'

import { TestcontainersIcon } from './TestcontainersIcon'

export interface TechIconDef {
  label: string
  Icon: IconType
  /** Brand colour, lightened where the original is too dark for the ink background. */
  color: string
}

/** Every technology shown on the site. The `Record` type keeps it exhaustive. */
export const techIcons: Record<TechId, TechIconDef> = {
  java: { label: 'Java', Icon: FaJava, color: '#f89820' },
  springBoot: { label: 'Spring Boot', Icon: SiSpringboot, color: '#6db33f' },
  springSecurity: { label: 'Spring Security', Icon: SiSpringsecurity, color: '#6db33f' },
  python: { label: 'Python', Icon: SiPython, color: '#4b8bbe' },
  django: { label: 'Django', Icon: SiDjango, color: '#44b78b' },
  postgresql: { label: 'PostgreSQL', Icon: SiPostgresql, color: '#6c9bd2' },
  mssql: { label: 'SQL Server', Icon: DiMsqlServer, color: '#e0534a' },
  flyway: { label: 'Flyway', Icon: SiFlyway, color: '#e0534a' },
  sqlite: { label: 'SQLite', Icon: SiSqlite, color: '#6fb8e6' },
  flutter: { label: 'Flutter', Icon: SiFlutter, color: '#54c5f8' },
  reactNative: { label: 'React Native', Icon: TbBrandReactNative, color: '#61dafb' },
  react: { label: 'React', Icon: SiReact, color: '#61dafb' },
  nextjs: { label: 'Next.js', Icon: SiNextdotjs, color: '#f4ede4' },
  typescript: { label: 'TypeScript', Icon: SiTypescript, color: '#4a93dd' },
  git: { label: 'Git', Icon: SiGit, color: '#f05033' },
  github: { label: 'GitHub', Icon: SiGithub, color: '#f4ede4' },
  gitlab: { label: 'GitLab', Icon: SiGitlab, color: '#fc6d26' },
  docker: { label: 'Docker', Icon: SiDocker, color: '#2496ed' },
  junit: { label: 'JUnit 5', Icon: SiJunit5, color: '#4fb86a' },
  testcontainers: { label: 'Testcontainers', Icon: TestcontainersIcon, color: '#3fc6b4' },
  firebase: { label: 'Firebase', Icon: SiFirebase, color: '#ffa611' },
}
