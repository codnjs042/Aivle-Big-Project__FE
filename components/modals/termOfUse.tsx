"use client";

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {useDisclosure} from "@nextui-org/use-disclosure";
import Content from '@/public/termOfUse.md';
export default function TermOfUse() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
      <>
        <Button className="h-8" onClick={onOpen}>이용약관</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1"> 이용약관 (2023.12.19)</ModalHeader>
                  <ModalBody className="overflow-y-auto max-h-[50vh]">
                    <p>
                      본 웹사이트는 방문자의 개인정보를 중요하게 생각하며, 이를 보호하기 위해 모든 노력을 다하고 있습니다.
                    </p>
                    <p>
                      이 개인정보 이용방침은 본 웹사이트가 방문자의 개인정보를 어떻게 수집, 사용, 공유, 보호하는지에 대한 정보를 제공합니다.
                    </p>
                    <p>
                      본 웹사이트를 사용함으로써 방문자는 본 개인정보 이용방침에 설명된 방법에 따라 본 웹사이트가 방문자의 개인정보를 수집, 사용, 공유,
                      보호하는 것에 동의하는 것으로 간주됩니다.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                      확인
                    </Button>
                  </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  );
}
