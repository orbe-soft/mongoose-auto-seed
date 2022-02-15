import arg from "arg";
import inquirer from "inquirer";
import path from "path";

import mkdirp from "mkdirp";

import fs from "fs";
import { promisify } from "util";

type IncompleteOptions = {
  name?: string;
  dir?: string;
};

type Options = {
  name: string;
  dir: string;
};

const readFile = promisify(fs.readFile);

const getOptions = (raw: string[]): IncompleteOptions => {
  const args = arg(
    {
      "--name": String,
      "--dir": String
    },
    {
      argv: raw.slice(1)
    }
  );

  return {
    name: args["--name"],
    dir: args["--dir"]
  };
};

const prompt = async (options: IncompleteOptions): Promise<Options> => {
  const questions: inquirer.Question[] = [];

  if (!options.name) {
    questions.push({
      type: "input",
      name: "name"
    });
  }

  if (!options.dir) {
    questions.push({
      type: "input",
      name: "dir"
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    name: options.name || answers.name,
    dir: options.dir || answers.dir
  };
};

const getTemplate = (): string => {
  return path.resolve(__dirname, "../../templates/oo/seeder.ts.template");
};

const getCurrentDir = (dir: string): string => {
  return path.resolve(process.cwd(), dir);
};

const generateUniqueName = (filename: string): string => {
  return `${filename}_${new Date().getTime()}.ts`;
};

const getTarget = (dir: string, name: string): string => {
  return path.resolve(dir, name);
};

const createFile = async (
  target: string,
  template: string,
  name: string,
  title: string
) => {
  const data = await readFile(template, 'utf8');

  const writeFile = promisify(fs.writeFile);
  await writeFile(
    target,
    data.replace("{@templatename}", name).replace("{@templatetitle}", title)
  );
};

const createDir = async (dir: string) => {
  await mkdirp(dir);
};

export const cli = async (raw: string[]) => {
  const incompleteOptions = getOptions(raw);
  const options = await prompt(incompleteOptions);

  const template = getTemplate();
  const currentDir = getCurrentDir(options.dir);

  await createDir(currentDir);

  const uniqueName = generateUniqueName(options.name);

  const target = getTarget(currentDir, uniqueName);

  await createFile(target, template, options.name, uniqueName);

  console.log("Seeder created successfully");
};
