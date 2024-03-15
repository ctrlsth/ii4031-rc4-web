"use client";
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberInput,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  NumberInputField,
  ChakraProvider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { ReactHTMLElement, useEffect, useState } from "react";
import { rc4, relativelyPrime } from "../utils/rc4";
import { encVigenere, decVigenere } from "@/utils/vigenere";

const DEFAULT_BG_COLOR = "#ffffff";
const ALGO_LIST = [
  "Vigenere Cipher",
  "Extended Vigenere Cipher",
  "Autokey Vigenere Cipher",
  "Playfair Cipher",
  "Product Cipher",
  "Affine Cipher",
];

export default function Home() {
  const [value, setValue] = useState("encrypt");
  const [click, setClick] = useState<string>("");
  // const [algo, setAlgo] = useState<string>("");
  const [inputType, setInputType] = useState<string>("text");
  const [inputText, setInputText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [mKey, setMKey] = useState<number>(0);
  const [bKey, setBKey] = useState<number>(0);
  const [resultText, setResultText] = useState<String>("");
  const [file, setFile] = useState<File | null>();
  const [fileName, setFileName] = useState("");

  const resetKey = () => {
    setKey("");
  };

  const resetAffineKey = () => {
    setBKey(0);
    setMKey(0);
  };

  const hasAlphabet = (input: string) => {
    return /[a-zA-Z]/.test(input.replace(/[^A-Za-z]/g, ""));
  };

  // const handleAlgoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setAlgo(e.target.value);
  //   if (e.target.value === "Affine Cipher") {
  //     resetKey();
  //   } else {
  //     resetAffineKey();
  //   }
  // };

  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value);
    setFile(null);
    setInputText("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function (e) {
        const text = reader.result as string;
        setInputText(text);
      };
    }
  }, [file]);

  const encodeBase64 = (data: any) => {
    return Buffer.from(data).toString("base64");
  };

  const saveToBinaryFile = (): void => {
    downloadFile(resultText, fileName);
  };

  const downloadFile = (resultText: String, fileName: string) => {
    const link = document.createElement("a");
    const output = [];
    for (let i = 0; i < resultText.length; i++) {
      output.push(resultText.charCodeAt(i));
    }

    const blob = new Blob([new Uint8Array(output)]);
    link.href = URL.createObjectURL(blob);

    if (fileName === "") {
      if (value === "encrypt") {
        link.download = "encrypted_result.txt";
      } else if (value === "decrypt") {
        link.download = "decrypted_result.txt";
      } else {
        link.download = "result.txt";
      }
    } else {
      if (value === "encrypt") {
        link.download = "encrypted_result_" + fileName;
      } else if (value === "decrypt") {
        link.download = "decrypted_result_" + fileName;
      } else {
        link.download = "result.txt";
      }
    }

    link.click();
  };

  const handleEncrypt = () => {
    setResultText(rc4(key, inputText, mKey, bKey));
  };

  const handleDecrypt = () => {
    setResultText(rc4(key, inputText, mKey, bKey));
  };

  const isTxtFile = (fileName: string): boolean => {
    if (fileName.slice(fileName.indexOf("."), fileName.length) === ".txt") {
      return true;
    }
    return false;
  };

  const copyContent = async (type: number) => {
    try {
      if (type == 1) {
        await navigator.clipboard.writeText(inputText);
      } else if (type == 2) {
        await navigator.clipboard.writeText(resultText.toString());
      } else {
        await navigator.clipboard.writeText(encodeBase64(resultText));
      }
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ChakraProvider>
      <title>NDCrypto - Cipher Tool</title>
      <Flex
        bgColor={"#f2f4f6"}
        minHeight={"100vh"}
        gap={8}
        flexDir={"column"}
        paddingTop={8}
        alignItems={"center"}>
        <Heading>Stream Cipher</Heading>
        <Flex flexDir={"column"} width={{ base: "80%", md: "70%" }} gap={4}>
          <Flex flexDir={"column"}>
            <FormLabel>Input Type</FormLabel>
            <Select
              bgColor={DEFAULT_BG_COLOR}
              onChange={(e) => handleInputTypeChange(e)}>
              <option value="text">Text</option>
              <option value="file">File</option>
            </Select>
          </Flex>

          {inputType === "text" ? (
            <Flex flexDir={"column"}>
              <FormLabel>Input Text</FormLabel>
              <Textarea
                placeholder="Enter text to encrypt or decrypt"
                bgColor={DEFAULT_BG_COLOR}
                height={"100px"}
                resize={"none"}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </Flex>
          ) : (
            <Flex flexDir={"column"}>
              <FormLabel>Upload File</FormLabel>
              <Input
                h="12"
                pt="2"
                type="file"
                bgColor={DEFAULT_BG_COLOR}
                onChange={(e) => {
                  if (e.target.files != null && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <>
                {file && file.size > 1024 * 1024 * 1.5 ? (
                  <Alert status="warning" fontSize="14px">
                    <AlertIcon h="4" />
                    For a better performance, please select a file that is 1 MB
                    or less.
                  </Alert>
                ) : null}
              </>
            </Flex>
          )}

          <Flex flexDir={"column"}>
            <FormControl>
              <FormLabel>Key</FormLabel>
              <Input
                placeholder="Enter a key"
                bgColor={DEFAULT_BG_COLOR}
                onChange={(e) => setKey(e.target.value)}
              />
            </FormControl>
          </Flex>
          <Flex flexDir={"row"} gap={4} justifyContent={"space-between"}>
            <Flex flexDir={"column"} width={"100%"}>
              <FormLabel>M-Key</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="Enter a number that is relative prime to 256"
                  bgColor={DEFAULT_BG_COLOR}
                  onChange={(e) => {
                    setMKey(parseInt(e.target.value));
                  }}
                />
              </NumberInput>
              <>
                {!relativelyPrime(mKey) ? (
                  <Alert status="warning" fontSize="14px">
                    <AlertIcon h="4" />
                    The number {mKey} is not relatively prime to 256
                  </Alert>
                ) : null}
              </>
            </Flex>
            <Flex flexDir={"column"} width={"100%"}>
              <FormLabel>B-Key</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="Enter a number"
                  bgColor={DEFAULT_BG_COLOR}
                  onChange={(e) => {
                    setBKey(parseInt(e.target.value));
                  }}
                />
              </NumberInput>
            </Flex>
          </Flex>
          <RadioGroup onChange={setValue} value={value}>
            <Flex gap={4}>
              <Radio value="encrypt">Encrypt</Radio>
              <Radio value="decrypt">Decrypt</Radio>
            </Flex>
          </RadioGroup>
        </Flex>
        <ButtonGroup spacing={4}>
          {value === "encrypt" ? (
            <Button
              isDisabled={
                !key ||
                !mKey ||
                !bKey ||
                !relativelyPrime(mKey) ||
                !inputText ||
                (!file && inputType === "file")
              }
              onClick={(e) => {
                handleEncrypt();
                setClick("encrypt");
                setText(inputText);
              }}
              colorScheme="green">
              Encrypt
            </Button>
          ) : (
            <Button
              isDisabled={
                !key ||
                !mKey ||
                !bKey ||
                !relativelyPrime(mKey) ||
                !inputText ||
                (!file && inputType === "file")
              }
              onClick={(e) => {
                handleDecrypt();
                setClick("decrypt");
                setText(inputText);
              }}
              colorScheme="orange">
              Decrypt
            </Button>
          )}
          <Button
            isDisabled={!resultText}
            onClick={saveToBinaryFile}
            colorScheme="blue">
            Download File
          </Button>
        </ButtonGroup>

        {resultText !== "" ? (
          <Flex
            flexDir={"column"}
            width={{ base: "80%", md: "70%" }}
            paddingBottom={8}
            gap={4}>
            {/* {algo != "Extended Vigenere Cipher" ? ( */}
            <Flex flexDir={"column"}>
              {click === "encrypt" ? (
                <FormLabel>Plaintext</FormLabel>
              ) : (
                <FormLabel>Ciphertext</FormLabel>
              )}
              <Flex
                bgColor={DEFAULT_BG_COLOR}
                minHeight={"100px"}
                maxHeight={"250px"}
                borderRadius={"6px"}
                border={"1px solid #e2e8f0"}
                paddingX={4}
                paddingY={2}
                maxWidth={"100%"}
                wordBreak={"break-all"}
                overflowY={"scroll"}>
                {text}
              </Flex>
              <Flex justifyContent={"end"} paddingTop={2}>
                <Button
                  colorScheme="grey"
                  variant="outline"
                  paddingX={4}
                  paddingY={4}
                  maxWidth={"20%"}
                  onClick={(e: any) => copyContent(1)}>
                  Copy Text!
                </Button>
              </Flex>
            </Flex>
            {/* ) : null} */}
            <Flex flexDir={"column"}>
              <FormLabel>Result</FormLabel>
              <Flex
                bgColor={DEFAULT_BG_COLOR}
                minHeight={"100px"}
                maxHeight={"250px"}
                borderRadius={"6px"}
                border={"1px solid #e2e8f0"}
                paddingX={4}
                paddingY={2}
                maxWidth={"100%"}
                wordBreak={"break-all"}
                overflowY={"scroll"}>
                {resultText}
              </Flex>
              <Flex justifyContent={"end"} paddingTop={2}>
                <Button
                  colorScheme="grey"
                  variant="outline"
                  paddingX={4}
                  paddingY={4}
                  maxWidth={"20%"}
                  onClick={(e: any) => copyContent(2)}>
                  Copy Text!
                </Button>
              </Flex>
            </Flex>
            <Flex flexDir={"column"}>
              <FormLabel>Result in Base64 Format</FormLabel>
              <Flex
                bgColor={DEFAULT_BG_COLOR}
                minHeight={"100px"}
                maxHeight={"250px"}
                borderRadius={"6px"}
                border={"1px solid #e2e8f0"}
                paddingX={4}
                paddingY={2}
                maxWidth={"100%"}
                wordBreak={"break-all"}
                overflowY={"scroll"}>
                {encodeBase64(resultText)}
              </Flex>
              <Flex justifyContent={"end"} paddingTop={2}>
                <Button
                  colorScheme="grey"
                  variant="outline"
                  paddingX={4}
                  paddingY={4}
                  maxWidth={"20%"}
                  onClick={(e: any) => copyContent(3)}>
                  Copy Text!
                </Button>
              </Flex>
            </Flex>
          </Flex>
        ) : null}
      </Flex>
    </ChakraProvider>
  );
}
