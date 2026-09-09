// SPDX-License-Identifier: KRONOS-CUSTOM-1.0
pragma solidity ^0.8.20;

/// @title KRONOS_LICENSE_SC
/// @notice Uso permitido únicamente conforme a las políticas de Co-Creatividad Simbiótica
/// @dev Este contrato es la fuente de verdad de la licencia. Ver 00_MANIFIESTO_CO-CREATIVIDAD.md
contract KRONOS_LICENSE_SC {
    string public constant NAME = "KRONOS Custom License v1.0";
    string public constant POLICY = "Co-Creatividad Simbiotica";
    string public constant LICENSE_TEXT = "Uso permitido unicamente conforme a las politicas de Co-Creatividad Simbiotica.";
    string public constant AUTHOR = "Marco / KRONOS-28-ITZA";
    uint256 public constant CREATED_AT = 2026;

    function getLicense() external pure returns (string memory) {
        return LICENSE_TEXT;
    }
}
